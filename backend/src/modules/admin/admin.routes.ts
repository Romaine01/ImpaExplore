import { Router } from 'express';
import { authenticate, authorizeAny } from '../../middleware/auth.js';
import { wrap } from '../../middleware/http.js';
import { ROLE } from '../users/roles.js';
import { auditLogs, bookings, dashboard, destinations, guides, packages, profile, users } from './admin.controller.js';

export const adminRoutes = Router();
adminRoutes.use(authenticate, authorizeAny(ROLE.platformAdmin, ROLE.superAdmin));
adminRoutes.get('/dashboard', wrap(dashboard));
adminRoutes.get('/guides', wrap(guides));
adminRoutes.get('/destinations', wrap(destinations));
adminRoutes.get('/packages', wrap(packages));
adminRoutes.get('/bookings', wrap(bookings));
adminRoutes.get('/audit-logs', wrap(auditLogs));
adminRoutes.get('/profile', wrap(profile));

export const superAdminRoutes = Router();
superAdminRoutes.use(authenticate, authorizeAny(ROLE.superAdmin));
superAdminRoutes.get('/users', wrap(users));
superAdminRoutes.get('/audit-logs', wrap(auditLogs));
