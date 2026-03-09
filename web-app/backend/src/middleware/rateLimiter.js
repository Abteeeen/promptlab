import rateLimit from 'express-rate-limit';

/** Public endpoints: 100 req/min per IP */
export const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — please slow down.' },
});

/** Generate endpoint: 30 req/min (heavier operation) */
export const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many generation requests — please wait a moment.' },
});

/** Auth endpoints: 10 req/min (prevent brute force) */
export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts.' },
});
