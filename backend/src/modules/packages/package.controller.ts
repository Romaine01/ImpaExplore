import type { Request, Response } from 'express';
import { userId } from '../../middleware/auth.js';
import { data } from '../../middleware/http.js';
import { archivePackage, createPackage, getPackage, listOwnPackages, listPackages, updatePackage } from './package.service.js';

export async function list(_req: Request, res: Response) { data(res, await listPackages()); }
export async function detail(req: Request, res: Response) { data(res, await getPackage(String(req.params.slug))); }
export async function own(_req: Request, res: Response) {
  data(res, await listOwnPackages(userId(res)));
}
export async function create(req: Request, res: Response) {
  data(res, await createPackage(userId(res), req.body), 201);
}
export async function update(req: Request, res: Response) {
  data(res, await updatePackage(userId(res), String(req.params.id), req.body));
}
export async function archive(req: Request, res: Response) {
  data(res, await archivePackage(userId(res), String(req.params.id)));
}
