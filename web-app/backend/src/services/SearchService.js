import { loadTemplates } from './TemplateService.js';

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Keyword-based template search.
 * Falls back gracefully when OpenAI is not configured.
 * Scores each template by term frequency across searchable fields.
 */
export function searchTemplates(query) {
  if (!query || query.trim().length < 2) return [];

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const templates = loadTemplates();

  const scored = templates.map((t) => {
    const searchable = [
      t.name, t.description, t.category, t.domain,
      ...t.proTips, ...t.brackets,
    ].join(' ').toLowerCase();

    let score = 0;
    for (const term of terms) {
      // Exact substring match
      const safe = escapeRegExp(term);
      const occurrences = (searchable.match(new RegExp(safe, 'g')) || []).length;
      score += occurrences;

      // Bonus: term in name or category is more relevant
      if (t.name.toLowerCase().includes(term)) score += 5;
      if (t.category.toLowerCase().includes(term)) score += 3;
      if (t.domain.toLowerCase().includes(term)) score += 2;
    }

    return { id: t.id, name: t.name, description: t.description, category: t.category, relevanceScore: score };
  });

  return scored
    .filter((t) => t.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}
