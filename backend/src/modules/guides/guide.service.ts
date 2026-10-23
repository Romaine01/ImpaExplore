import { Guide } from './Guide.model.js';
import { failure } from '../../middleware/http.js';

export const listGuides = () =>
  Guide.find({ status: 'published' }).select('slug displayName bio specialties demo').limit(50).lean();

export async function getGuide(slug: string) {
  const item = await Guide.findOne({ slug, status: 'published' }).select('slug displayName bio specialties socialLinks demo').lean();
  if (!item) throw failure(404, 'Not found');
  return item;
}

export const getOwnGuide = (userId: string) =>
  Guide.findOne({ userId }).select('slug displayName bio specialties socialLinks status').lean();

export async function updateOwnGuide(userId: string, input: Record<string, unknown>) {
  const guide = await Guide.findOneAndUpdate({ userId, status: 'published' }, { $set: input }, { new: true });
  if (!guide) throw failure(403, 'Guide is unavailable');
  return guide;
}
