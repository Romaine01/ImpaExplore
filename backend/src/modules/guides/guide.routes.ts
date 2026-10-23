import { Router } from 'express';
import { wrap } from '../../middleware/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { guideProfileInput } from './guide.schema.js';
import { detail, list, profile, updateProfile } from './guide.controller.js';

export const publicGuideRoutes = Router();
publicGuideRoutes.get('/', wrap(list));
publicGuideRoutes.get('/:slug', wrap(detail));

export const privateGuideRoutes = Router();
privateGuideRoutes.use(authenticate, authorize('guide'));
privateGuideRoutes.get('/profile', wrap(profile));
privateGuideRoutes.patch('/profile', validateRequest(guideProfileInput), wrap(updateProfile));
