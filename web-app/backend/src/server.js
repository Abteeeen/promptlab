import 'dotenv/config';
import app from './app.js';
import { testConnection } from './models/database.js';
import { loadTemplates } from './services/TemplateService.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 3001;

async function start() {
  // DB is optional — core features (templates, generate, score) work without it.
  // Only auth + save-to-library require a database.
  if (process.env.DATABASE_URL) {
    try {
      await testConnection();
    } catch (err) {
      logger.warn('Database unavailable — save/auth features disabled', { error: err.message });
    }
  } else {
    logger.warn('DATABASE_URL not set — running without database (save/auth disabled)');
  }

  // Pre-load and cache all templates at startup
  const templates = loadTemplates();
  logger.info(`Templates ready: ${templates.length} loaded`);

  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Health: http://localhost:${PORT}/health`);
  });
}

start();
