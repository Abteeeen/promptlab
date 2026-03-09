import { Router } from 'express';
import { listTemplates, getTemplateById } from '../services/TemplateService.js';
import { searchTemplates } from '../services/SearchService.js';
import { trackEvent } from '../services/AnalyticsService.js';

const router = Router();

// GET /api/templates — list all templates (summary fields only)
router.get('/', (req, res) => {
  res.json(listTemplates());
});

// GET /api/templates/search?q=query — search templates by keyword
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters.' });
  }
  const results = searchTemplates(q);
  trackEvent({ eventType: 'search_attempted', metadata: { query: q, resultCount: results.length } });
  res.json(results);
});

// GET /api/templates/:id — full template detail
router.get('/:id', (req, res) => {
  const template = getTemplateById(req.params.id);
  if (!template) {
    return res.status(404).json({ error: 'Template not found.' });
  }
  trackEvent({
    eventType: 'template_viewed',
    templateId: template.id,
    sessionId: req.headers['x-session-id'],
  });
  res.json(template);
});

export default router;
