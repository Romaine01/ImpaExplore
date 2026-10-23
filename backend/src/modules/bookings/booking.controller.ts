import type { Request, Response } from 'express';
import { userId } from '../../middleware/auth.js';
import { data } from '../../middleware/http.js';
import { cancelBooking, getBooking, listGuideBookings, listOwnBookings, requestBooking, respondToBooking } from './booking.service.js';

export async function create(req: Request, res: Response) {
  data(res, await requestBooking(userId(res), req.body), 201);
}
export async function own(_req: Request, res: Response) {
  data(res, await listOwnBookings(userId(res)));
}
export async function detail(req: Request, res: Response) {
  data(res, await getBooking(userId(res), String(req.params.id)));
}
export async function cancel(req: Request, res: Response) {
  data(res, await cancelBooking(userId(res), String(req.params.id)));
}
export async function guideList(_req: Request, res: Response) {
  data(res, await listGuideBookings(userId(res)));
}
export async function respond(req: Request, res: Response) {
  data(res, await respondToBooking(userId(res), String(req.params.id), req.body));
}
