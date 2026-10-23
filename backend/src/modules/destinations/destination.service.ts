import { Destination } from './Destination.model.js';
import { failure } from '../../middleware/http.js';

export async function listDestinations(search: string, page: number) {
  const q = search.slice(0, 80);
  const filter = { status: 'published', ...(q ? { name: { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } } : {}) };
  const [items, total] = await Promise.all([
    Destination.find(filter).select('name slug category summary barangay demo').skip((page - 1) * 12).limit(12).lean(),
    Destination.countDocuments(filter),
  ]);
  return { items, meta: { page, total, limit: 12 } };
}

export async function getDestination(slug: string) {
  const item = await Destination.findOne({ slug, status: 'published' }).select('name slug category summary description barangay demo').lean();
  if (!item) throw failure(404, 'Not found');
  return item;
}
