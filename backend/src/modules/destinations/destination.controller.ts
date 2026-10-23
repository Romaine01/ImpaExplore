import type { Request, Response } from 'express';
import { data } from '../../middleware/http.js';
import { getDestination, listDestinations } from './destination.service.js';

export async function list(req: Request, res: Response) {
  const result = await listDestinations(String(req.query.q || ''), Math.max(1, Number(req.query.page) || 1));
  res.json({ data: result.items, meta: result.meta });
}

export async function detail(req: Request, res: Response) {
  data(res, await getDestination(String(req.params.slug)));
}
