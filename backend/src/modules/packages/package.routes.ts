import { Router } from 'express';
import { wrap } from '../../middleware/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { z } from 'zod';
import { packageInput } from './package.schema.js';
import { archive, create, detail, list, own, update } from './package.controller.js';

export const publicPackageRoutes = Router();
publicPackageRoutes.get('/', wrap(list));
publicPackageRoutes.get('/:slug', wrap(detail));

export const privatePackageRoutes = Router();
privatePackageRoutes.use(authenticate, authorize('guide'));
privatePackageRoutes.get('/', wrap(own));
privatePackageRoutes.post('/', validateRequest(packageInput), wrap(create));
privatePackageRoutes.patch('/:id', validateRequest(packageInput.extend({ status: z.enum(['draft', 'published']) })), wrap(update));
privatePackageRoutes.delete('/:id', wrap(archive));
