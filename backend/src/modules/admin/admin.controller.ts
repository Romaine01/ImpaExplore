import type { Request, Response } from 'express';
import { data } from '../../middleware/http.js';
import { normalizeRoles } from '../users/roles.js';
import { dashboardSummary, listAuditLogs, listBookings, listDestinations, listGuides, listPackages, listUsers } from './admin.service.js';

export async function dashboard(_req: Request, res: Response) { data(res, await dashboardSummary()); }
export async function guides(_req: Request, res: Response) { data(res, await listGuides()); }
export async function destinations(_req: Request, res: Response) { data(res, await listDestinations()); }
export async function packages(_req: Request, res: Response) { data(res, await listPackages()); }
export async function bookings(_req: Request, res: Response) { data(res, await listBookings()); }
export async function auditLogs(_req: Request, res: Response) { data(res, await listAuditLogs()); }
export async function users(_req: Request, res: Response) {
  const records = await listUsers();
  data(res, records.map(record => ({ ...record, roles: normalizeRoles(record.roles) })));
}
export async function profile(_req: Request, res: Response) {
  const user = res.locals.user;
  data(res, { id: user.id, name: user.get('name'), email: user.get('email'), roles: normalizeRoles(user.get('roles')) });
}
