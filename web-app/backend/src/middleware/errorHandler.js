import logger from '../utils/logger.js';

/**
 * Global Express error handler.
 * Must be registered as the last middleware: app.use(errorHandler)
 */
export function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (status >= 500) {
    logger.error('Unhandled error', {
      method: req.method,
      path: req.path,
      status,
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * 404 catch-all — register before errorHandler.
 */
export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
}
