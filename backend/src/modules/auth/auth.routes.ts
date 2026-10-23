import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { wrap } from '../../middleware/http.js';
import { authenticate } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { adminLoginInput, loginInput, registerInput } from './auth.schema.js';
import { loginAccount, loginAdmin, logout, me, registerAccount } from './auth.controller.js';

const router = Router();
const authLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-8', legacyHeaders: false });
const privilegedAuthLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false });
router.post('/register', authLimit, validateRequest(registerInput), wrap(registerAccount));
router.post('/login', authLimit, validateRequest(loginInput), wrap(loginAccount));
router.post('/admin/login', privilegedAuthLimit, validateRequest(adminLoginInput), wrap(loginAdmin));
router.post('/logout', wrap(logout));
router.get('/me', authenticate, wrap(me));
export default router;
