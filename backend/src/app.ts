import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { data } from './middleware/http.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';
import destinationRoutes from './modules/destinations/destination.routes.js';
import { publicGuideRoutes, privateGuideRoutes } from './modules/guides/guide.routes.js';
import { applicationRoutes, adminApplicationRoutes } from './modules/guideApplications/guideApplication.routes.js';
import { publicPackageRoutes, privatePackageRoutes } from './modules/packages/package.routes.js';
import availabilityRoutes from './modules/availability/availability.routes.js';
import { touristBookingRoutes, guideBookingRoutes } from './modules/bookings/booking.routes.js';
import { adminRoutes, superAdminRoutes } from './modules/admin/admin.routes.js';

const app = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json({ limit: '20kb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'development-only-replace-this-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/impaexplore' }),
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 604800000 },
}));
app.use((req, res, next) => {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers.origin !== frontendOrigin) {
    res.status(403).json({ error: { code: 'ORIGIN_DENIED', message: 'Request origin denied' } });
    return;
  }
  next();
});
app.use('/api/v1/auth', (_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next(); });
app.use('/api/v1/admin', (_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next(); });
app.use('/api/v1/super-admin', (_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next(); });

app.get('/api/v1/health', (_req, res) => data(res, { status: 'ok' }));
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/guides', publicGuideRoutes);
app.use('/api/v1/packages', publicPackageRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/guide-applications', applicationRoutes);
app.use('/api/v1/admin/guide-applications', adminApplicationRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/super-admin', superAdminRoutes);
app.use('/api/v1/guide/packages', privatePackageRoutes);
app.use('/api/v1/guide/availability', availabilityRoutes);
app.use('/api/v1/guide/bookings', guideBookingRoutes);
app.use('/api/v1/guide', privateGuideRoutes);
app.use('/api/v1/bookings', touristBookingRoutes);
app.use(errorHandler);
export default app;
