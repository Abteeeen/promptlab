/**
 * Run database migrations.
 * Usage: node src/models/migrate.js
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import { query, testConnection } from './database.js';
import logger from '../utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, '../../schema.sql');

async function migrate() {
  await testConnection();
  const sql = readFileSync(schemaPath, 'utf8');
  await query(sql);
  logger.info('Migration complete');
  process.exit(0);
}

migrate().catch((err) => {
  logger.error('Migration failed', { error: err.message });
  process.exit(1);
});
