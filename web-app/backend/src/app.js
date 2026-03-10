import express from 'express';
import cors from 'cors';
import { publicLimiter, generateLimiter, authLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { optionalAuth } from './middleware/auth.js';

import templateRoutes from './routes/templates.js';
import formRoutes from './routes/forms.js';
import promptRoutes from './routes/prompts.js';
import qualityRoutes from './routes/qualityScore.js';
import authRoutes from './routes/auth.js';
import analyticsRoutes from './routes/analytics.js';
import aiRoutes from './routes/ai.js';

const app = express();

// ── CORS ────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    if (process.env.CORS_ALLOW_ALL === 'true') return callback(null, true);

    const allowed = new Set([
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      process.env.FRONTEND_URL,
      ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : []),
    ].filter(Boolean).map(s => String(s).trim()).filter(Boolean));

    // Allow same-origin / non-browser requests (no Origin header)
    if (!origin) return callback(null, true);
    if (allowed.has(origin)) return callback(null, true);

    const err = new Error('Not allowed by CORS');
    // @ts-ignore
    err.status = 403;
    // @ts-ignore
    err.statusCode = 403;
    return callback(err);
  },
  credentials: true,
}));

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '64kb' }));

// ── Attach user from token if present (all routes) ──────────────────────────
app.use(optionalAuth);

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/templates', publicLimiter, templateRoutes);
app.use('/api/forms', publicLimiter, formRoutes);
app.use('/api/prompts', generateLimiter, promptRoutes);
app.use('/api/quality-score', generateLimiter, qualityRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', authLimiter, authRoutes);   // /api/users/profile shares auth router
app.use('/api/analytics', publicLimiter, analyticsRoutes);
app.use('/api/ai', generateLimiter, aiRoutes);

// ── 404 + Error handling ─────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
