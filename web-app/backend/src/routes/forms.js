import { Router } from 'express';
import { generateForm } from '../services/FormGenerationService.js';

const router = Router();

// GET /api/forms/:templateId?mode=quick|standard|advanced
router.get('/:templateId', (req, res) => {
  const { templateId } = req.params;
  const mode = ['quick', 'standard', 'advanced'].includes(req.query.mode)
    ? req.query.mode
    : 'standard';

  const form = generateForm(templateId, mode);
  if (!form) {
    return res.status(404).json({ error: 'Template not found.' });
  }
  res.json(form);
});

export default router;
