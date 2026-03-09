import jwt from 'jsonwebtoken';

/**
 * Middleware: require a valid JWT in the Authorization header.
 * Sets req.user = { id, email, name } on success.
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = header.slice(7);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Middleware: attach user if token is present, but don't block if absent.
 * Useful for endpoints that work for both anonymous and authenticated users.
 */
export function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try {
      req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    } catch {
      // Token invalid — treat as anonymous
    }
  }
  next();
}

/**
 * Middleware: admin-only routes.
 * Requires requireAuth to run first.
 */
export function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}
