import { Router } from 'express';
import { scorePrompt } from '../services/QualityScorerService.js';

const router = Router();

// POST /api/quality-score
router.post('/', (req, res) => {
  const { promptText } = req.body;

  if (!promptText || typeof promptText !== 'string') {
    return res.status(400).json({ error: 'promptText is required.' });
  }
  if (promptText.length > 5000) {
    return res.status(400).json({ error: 'promptText must be 5000 characters or fewer.' });
  }

  res.json(scorePrompt(promptText));
});

export default router;
