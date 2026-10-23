import type { Request, Response } from 'express';
import { userId } from '../../middleware/auth.js';
import { data } from '../../middleware/http.js';
import { apply, listApplications, mine, review } from './guideApplication.service.js';

export async function submit(req: Request, res: Response) {
  data(res, await apply(userId(res), req.body), 201);
}
export async function own(_req: Request, res: Response) {
  data(res, await mine(userId(res)));
}
export async function list(_req: Request, res: Response) {
  data(res, await listApplications());
}
export async function decide(req: Request, res: Response) {
  data(res, await review(String(req.params.id), userId(res), req.body));
}
