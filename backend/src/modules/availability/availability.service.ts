import { failure } from '../../middleware/http.js';
import { Guide } from '../guides/Guide.model.js';
import { Availability } from './Availability.model.js';

export async function getAvailability(userId: string) {
  const guide = await Guide.findOne({ userId });
  if (!guide) throw failure(404, 'Guide profile not found');
  return (await Availability.findOne({ guideId: guide.id }))?.get('blockedDays') || [];
}

export async function setAvailability(userId: string, blockedDays: string[]) {
  const guide = await Guide.findOne({ userId, status: 'published' });
  if (!guide) throw failure(403, 'Guide is unavailable');
  return Availability.findOneAndUpdate({ guideId: guide.id }, { $set: { blockedDays: [...new Set(blockedDays)] } }, { upsert: true, new: true });
}
