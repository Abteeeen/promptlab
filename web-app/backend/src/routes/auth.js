import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../models/database.js';
import { requireAuth } from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = Router();

/**
 * Exchange a GitHub OAuth code for a JWT.
 *
 * Flow:
 * 1. Frontend redirects user to GitHub OAuth
 * 2. GitHub redirects back with ?code=...
 * 3. Frontend POSTs the code here
 * 4. We exchange with GitHub, get user info, upsert user, return JWT
 */
router.post('/github', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'code is required.' });
  if (!process.env.DATABASE_URL) return res.status(503).json({ error: 'Database not configured — authentication is currently disabled.' });
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    return res.status(500).json({ error: 'GitHub OAuth is not configured on the server.' });
  }
  if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'JWT_SECRET is not configured on the server.' });

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      logger.warn('GitHub OAuth token exchange failed', { error: tokenData.error });
      return res.status(401).json({ error: 'GitHub authentication failed.' });
    }

    // Get GitHub user profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'prompt-engineering-platform' },
    });
    const ghUser = await userRes.json();

    // Upsert user in our database
    const result = await query(
      `INSERT INTO users (github_id, name, email, avatar_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (github_id) DO UPDATE
         SET name = EXCLUDED.name,
             avatar_url = EXCLUDED.avatar_url
       RETURNING id, name, email, avatar_url, created_at`,
      [String(ghUser.id), ghUser.name || ghUser.login, ghUser.email || null, ghUser.avatar_url]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
    );

    res.json({ token, user });
  } catch (err) {
    logger.error('GitHub auth error', { error: err.message });
    res.status(500).json({ error: 'Authentication failed.' });
  }
});

// GET /api/users/profile — return current authenticated user
router.get('/profile', requireAuth, async (req, res) => {
  if (!process.env.DATABASE_URL) return res.status(503).json({ error: 'Database not configured — profile is unavailable.' });
  const result = await query(
    `SELECT u.id, u.name, u.email, u.avatar_url, u.subscription, u.created_at,
            COUNT(p.id)::int AS prompts_count
     FROM users u
     LEFT JOIN user_prompts p ON p.user_id = u.id
     WHERE u.id = $1
     GROUP BY u.id`,
    [req.user.id]
  );

  if (!result.rows.length) return res.status(404).json({ error: 'User not found.' });
  res.json(result.rows[0]);
});

// POST /api/auth/logout — client-side token deletion; server just confirms
router.post('/logout', requireAuth, (req, res) => {
  res.json({ success: true });
});

export default router;
