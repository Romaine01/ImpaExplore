import { Router } from 'express';
import { wrap } from '../../middleware/http.js';
import { detail, list } from './destination.controller.js';

const router = Router();
router.get('/', wrap(list));
router.get('/:slug', wrap(detail));
export default router;
