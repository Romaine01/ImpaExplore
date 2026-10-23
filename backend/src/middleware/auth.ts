import type { Request, RequestHandler, Response } from 'express';
import { User } from '../modules/users/User.model.js';
import { hasAnyRole, type AppRole } from '../modules/users/roles.js';
import { failure } from './http.js';

declare module 'express-session' {
  interface SessionData { userId?: string }
}

export async function current(req: Request) {
  if (!req.session.userId) throw failure(401, 'Sign in required');
  const user = await User.findById(req.session.userId);
  if (!user || user.get('status') !== 'active') throw failure(401, 'Sign in required');
  return user;
}

export const authenticate: RequestHandler = (req, res, next) => {
  current(req).then(user => { res.locals.user = user; next(); }).catch(next);
};

export const authorize = (wanted: string): RequestHandler => (_req, res, next) => {
  if (!res.locals.user) return next(failure(401, 'Sign in required'));
  if (!(res.locals.user.get('roles') as string[]).includes(wanted)) return next(failure(403, 'Access denied'));
  next();
};

export const authorizeAny = (...wanted: AppRole[]): RequestHandler => (_req, res, next) => {
  if (!res.locals.user) return next(failure(401, 'Sign in required'));
  if (!hasAnyRole(res.locals.user.get('roles'), wanted)) return next(failure(403, 'Access denied'));
  next();
};

export function userId(res: Response) {
  if (!res.locals.user) throw failure(401, 'Sign in required');
  return String(res.locals.user.id);
}
