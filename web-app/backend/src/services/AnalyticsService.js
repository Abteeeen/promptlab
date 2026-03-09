import { query } from '../models/database.js';
import logger from '../utils/logger.js';

/**
 * Track an analytics event.
 * All fields except event_type are optional — supports anonymous tracking.
 */
export async function trackEvent({ eventType, templateId, userId, sessionId, qualityScore, metadata, ipAddress }) {
  try {
    await query(
      `INSERT INTO analytics_events
         (event_type, template_id, user_id, session_id, quality_score, metadata, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [eventType, templateId || null, userId || null, sessionId || null,
       qualityScore || null, JSON.stringify(metadata || {}), ipAddress || null]
    );
  } catch (err) {
    // Analytics failures should never break the main flow
    logger.warn('Analytics event failed to save', { eventType, error: err.message });
  }
}

/**
 * Aggregate stats for the admin dashboard.
 */
export async function getDashboardStats() {
  const [dau, totalPrompts, avgScore, popular] = await Promise.all([
    query(`
      SELECT COUNT(DISTINCT session_id) AS dau
      FROM analytics_events
      WHERE created_at >= NOW() - INTERVAL '1 day'
        AND event_type = 'prompt_generated'
    `),
    query(`
      SELECT COUNT(*) AS total
      FROM analytics_events
      WHERE event_type = 'prompt_generated'
    `),
    query(`
      SELECT ROUND(AVG(quality_score), 1) AS avg_score
      FROM analytics_events
      WHERE event_type = 'prompt_generated'
        AND quality_score IS NOT NULL
    `),
    query(`
      SELECT template_id, COUNT(*) AS uses
      FROM analytics_events
      WHERE event_type = 'prompt_generated'
        AND template_id IS NOT NULL
      GROUP BY template_id
      ORDER BY uses DESC
      LIMIT 5
    `),
  ]);

  return {
    dau: parseInt(dau.rows[0]?.dau || 0),
    totalPromptsGenerated: parseInt(totalPrompts.rows[0]?.total || 0),
    averageQualityScore: parseFloat(avgScore.rows[0]?.avg_score || 0),
    popularTemplates: popular.rows,
  };
}
