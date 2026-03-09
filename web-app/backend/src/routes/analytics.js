import { Router } from 'express';
import { trackEvent, getDashboardStats } from '../services/AnalyticsService.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/analytics/event — track a frontend event (anonymous or authenticated)
router.post('/event', async (req, res) => {
  const { event, templateId, sessionId, metadata } = req.body;

  if (!event) return res.status(400).json({ error: 'event is required.' });

  await trackEvent({
    eventType: event,
    templateId: templateId || null,
    userId: req.user?.id || null,
    sessionId: sessionId || null,
    metadata,
    ipAddress: req.ip,
  });

  res.json({ success: true });
});

// GET /api/analytics/dashboard — admin only
router.get('/dashboard', requireAuth, requireAdmin, async (req, res) => {
  const stats = await getDashboardStats();
  res.json(stats);
});

export default router;
