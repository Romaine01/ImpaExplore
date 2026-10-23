import type { Request, Response } from 'express';
import { userId } from '../../middleware/auth.js';
import { data } from '../../middleware/http.js';
import { getAvailability, setAvailability } from './availability.service.js';

export async function list(_req: Request, res: Response) {
  data(res, await getAvailability(userId(res)));
}
export async function update(req: Request, res: Response) {
  data(res, await setAvailability(userId(res), req.body.blockedDays));
}
