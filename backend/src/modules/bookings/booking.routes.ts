import { Router } from 'express';
import { wrap } from '../../middleware/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { bookingInput, responseInput } from './booking.schema.js';
import { cancel, create, detail, guideList, own, respond } from './booking.controller.js';

export const touristBookingRoutes = Router();
touristBookingRoutes.use(authenticate);
touristBookingRoutes.post('/', authorize('tourist'), validateRequest(bookingInput), wrap(create));
touristBookingRoutes.get('/mine', wrap(own));
touristBookingRoutes.get('/:id', wrap(detail));
touristBookingRoutes.patch('/:id/cancel', authorize('tourist'), wrap(cancel));

export const guideBookingRoutes = Router();
guideBookingRoutes.use(authenticate, authorize('guide'));
guideBookingRoutes.get('/', wrap(guideList));
guideBookingRoutes.patch('/:id/respond', validateRequest(responseInput), wrap(respond));
