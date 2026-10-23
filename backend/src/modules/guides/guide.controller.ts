import type { Request, Response } from 'express';
import { userId } from '../../middleware/auth.js';
import { data } from '../../middleware/http.js';
import { getGuide, getOwnGuide, listGuides, updateOwnGuide } from './guide.service.js';

export async function list(_req: Request, res: Response) { data(res, await listGuides()); }
export async function detail(req: Request, res: Response) { data(res, await getGuide(String(req.params.slug))); }
export async function profile(_req: Request, res: Response) {
  data(res, await getOwnGuide(userId(res)));
}
export async function updateProfile(req: Request, res: Response) {
  data(res, await updateOwnGuide(userId(res), req.body));
}
