import type { z } from 'zod';
import { failure } from '../../middleware/http.js';
import { slug } from '../../utils/slug.js';
import { Destination } from '../destinations/Destination.model.js';
import { Guide } from '../guides/Guide.model.js';
import { Package } from './Package.model.js';
import { packageInput } from './package.schema.js';

export const listPackages = () =>
  Package.find({ status: 'published' }).select('slug title description priceAmount demo guideId destinationId').limit(50).lean();

export async function getPackage(slugValue: string) {
  const item = await Package.findOne({ slug: slugValue, status: 'published' }).select('slug title description priceAmount demo guideId destinationId').lean();
  if (!item) throw failure(404, 'Not found');
  return item;
}

export async function listOwnPackages(userId: string) {
  const guide = await Guide.findOne({ userId });
  return guide ? Package.find({ guideId: guide.id }).sort({ createdAt: -1 }).lean() : [];
}

async function publishedGuide(userId: string) {
  const guide = await Guide.findOne({ userId, status: 'published' });
  if (!guide) throw failure(403, 'Guide is unavailable');
  return guide;
}

async function validateDestination(destinationId: string) {
  const destination = await Destination.findById(destinationId);
  if (!destination || destination.get('status') !== 'published') throw failure(422, 'Destination unavailable');
}

export async function createPackage(userId: string, input: z.infer<typeof packageInput>) {
  const guide = await publishedGuide(userId);
  await validateDestination(input.destinationId);
  return Package.create({ ...input, guideId: guide.id, slug: slug(input.title) + '-' + crypto.randomUUID().slice(0, 8), status: 'draft' });
}

export async function updatePackage(userId: string, id: string, input: z.infer<typeof packageInput> & { status: 'draft' | 'published' }) {
  const guide = await publishedGuide(userId);
  await validateDestination(input.destinationId);
  const item = await Package.findOneAndUpdate({ _id: id, guideId: guide.id }, { $set: input }, { new: true });
  if (!item) throw failure(404, 'Package not found');
  return item;
}

export async function archivePackage(userId: string, id: string) {
  const guide = await Guide.findOne({ userId });
  const item = guide && await Package.findOneAndUpdate({ _id: id, guideId: guide.id }, { $set: { status: 'archived' } }, { new: true });
  if (!item) throw failure(404, 'Package not found');
  return item;
}
