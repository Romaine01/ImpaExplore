import { Router } from 'express';
import { wrap } from '../../middleware/http.js';
import { authenticate, authorizeAny } from '../../middleware/auth.js';
import { ROLE } from '../users/roles.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { applicationInput, reviewInput } from './guideApplication.schema.js';
import { decide, list, own, submit } from './guideApplication.controller.js';

export const applicationRoutes = Router();
applicationRoutes.use(authenticate);
applicationRoutes.post('/', validateRequest(applicationInput), wrap(submit));
applicationRoutes.get('/mine', wrap(own));

export const adminApplicationRoutes = Router();
adminApplicationRoutes.use(authenticate, authorizeAny(ROLE.platformAdmin, ROLE.superAdmin));
adminApplicationRoutes.get('/', wrap(list));
adminApplicationRoutes.patch('/:id/review', validateRequest(reviewInput), wrap(decide));
