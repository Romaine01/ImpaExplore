import { User } from '../users/User.model.js';
import { Guide } from '../guides/Guide.model.js';
import { GuideApplication } from '../guideApplications/GuideApplication.model.js';
import { Destination } from '../destinations/Destination.model.js';
import { Package } from '../packages/Package.model.js';
import { Booking } from '../bookings/Booking.model.js';
import { Audit } from './Audit.model.js';

const listLimit = 100;

export async function dashboardSummary() {
  const [users, guides, pendingApplications, destinations, packages, pendingBookings] = await Promise.all([
    User.countDocuments({ status: 'active' }),
    Guide.countDocuments({}),
    GuideApplication.countDocuments({ status: 'pending' }),
    Destination.countDocuments({}),
    Package.countDocuments({}),
    Booking.countDocuments({ status: 'PENDING' }),
  ]);
  return { users, guides, pendingApplications, destinations, packages, pendingBookings };
}

export const listGuides = () => Guide.find().sort({ updatedAt: -1 }).limit(listLimit).lean();
export const listDestinations = () => Destination.find().sort({ updatedAt: -1 }).limit(listLimit).lean();
export const listPackages = () => Package.find().sort({ updatedAt: -1 }).limit(listLimit).lean();
export const listBookings = () => Booking.find().sort({ createdAt: -1 }).limit(listLimit).lean();
export const listAuditLogs = () => Audit.find().sort({ createdAt: -1 }).limit(listLimit).lean();
export const listUsers = () => User.find().select('name email roles status createdAt updatedAt').sort({ createdAt: -1 }).limit(listLimit).lean();
