import type { Request, Response } from 'express';
import { data } from '../../middleware/http.js';
import { adminLogin, login, publicUser, register } from './auth.service.js';
import { Audit } from '../admin/Audit.model.js';

export async function registerAccount(req: Request, res: Response) {
  const user = await register(req.body);
  req.session.userId = String(user.id);
  data(res, publicUser(user), 201);
}
export async function loginAccount(req: Request, res: Response) {
  const user = await login(req.body);
  await new Promise<void>((resolve, reject) => req.session.regenerate(e => e ? reject(e) : resolve()));
  req.session.userId = String(user.id);
  data(res, publicUser(user));
}
export async function loginAdmin(req: Request, res: Response) {
  const user = await adminLogin(req.body);
  await new Promise<void>((resolve, reject) => req.session.regenerate(e => e ? reject(e) : resolve()));
  req.session.userId = String(user.id);
  await Audit.create({ actorId: user.id, action: 'admin.login.succeeded', entityId: user.id });
  data(res, publicUser(user));
}
export async function logout(req: Request, res: Response) {
  await new Promise<void>((resolve, reject) => req.session.destroy(e => e ? reject(e) : resolve()));
  res.status(204).end();
}
export async function me(_req: Request, res: Response) {
  data(res, publicUser(res.locals.user));
}
