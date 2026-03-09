import { Router } from 'express';
import { generateWithAI } from '../services/AIService.js';
import { scorePrompt } from '../services/QualityScorerService.js';
import { trackEvent } from '../services/AnalyticsService.js';

const router = Router();

// POST /api/ai/generate
// Body: { request: string }
// Returns: { prompt, qualityScore, model, source }
router.post('/generate', async (req, res) => {
  const { request } = req.body;

  if (!request || typeof request !== 'string' || request.trim().length < 5) {
    return res.status(400).json({ error: 'request must be at least 5 characters.' });
  }
  if (request.length > 1000) {
    return res.status(400).json({ error: 'request must be 1000 characters or fewer.' });
  }

  const result = await generateWithAI(request.trim());
  const qualityScore = scorePrompt(result.prompt);

  trackEvent({
    eventType: 'ai_prompt_generated',
    sessionId: req.headers['x-session-id'],
    userId: req.user?.id,
    qualityScore: qualityScore.overallScore,
    metadata: { source: result.source, requestLength: request.length },
  });

  res.json({ ...result, qualityScore });
});

export default router;
