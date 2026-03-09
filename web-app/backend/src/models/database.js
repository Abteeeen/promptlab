import pg from 'pg';
import logger from '../utils/logger.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  logger.error('Unexpected PostgreSQL pool error', { error: err.message });
});

export async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Query executed', { text, duration, rows: result.rowCount });
    return result;
  } catch (err) {
    logger.error('Query failed', { text, error: err.message });
    throw err;
  }
}

export async function getClient() {
  return pool.connect();
}

export async function testConnection() {
  const result = await query('SELECT NOW()');
  logger.info('Database connected', { time: result.rows[0].now });
}

export default pool;
