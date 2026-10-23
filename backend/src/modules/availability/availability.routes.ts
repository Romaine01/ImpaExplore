import { Router } from 'express';
import { wrap } from '../../middleware/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { availabilityInput } from './availability.schema.js';
import { list, update } from './availability.controller.js';

const router = Router();
router.use(authenticate, authorize('guide'));
router.get('/', wrap(list));
router.put('/', validateRequest(availabilityInput), wrap(update));
export default router;
