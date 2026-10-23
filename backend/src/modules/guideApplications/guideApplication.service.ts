import type { z } from 'zod';
import { failure } from '../../middleware/http.js';
import { slug } from '../../utils/slug.js';
import { Audit } from '../admin/Audit.model.js';
import { Guide } from '../guides/Guide.model.js';
import { User } from '../users/User.model.js';
import { GuideApplication } from './GuideApplication.model.js';
import type { applicationInput, reviewInput } from './guideApplication.schema.js';

export async function apply(userId: string, input: z.infer<typeof applicationInput>) {
  if (await GuideApplication.exists({ userId })) throw failure(409, 'Application already exists');
  return GuideApplication.create({ ...input, userId });
}
export const mine = (userId: string) =>
  GuideApplication.findOne({ userId }).select('-__v').lean();
export const listApplications = () => GuideApplication.find().limit(100).lean();

export async function review(id: string, adminId: string, input: z.infer<typeof reviewInput>) {
  const item = await GuideApplication.findById(id);
  if (!item || item.get('status') !== 'pending') throw failure(404, 'Pending application not found');
  item.set({ status: input.status, reviewReason: input.reason });
  await item.save();
  if (input.status === 'approved') {
    const user = await User.findById(item.get('userId'));
    if (user) {
      user.set('roles', Array.from(new Set([...(user.get('roles') as string[]), 'guide'])));
      await user.save();
    }
    await Guide.create({
      userId: item.get('userId'),
      slug: slug(String(item.get('displayName'))) + '-' + String(item.id).slice(-6),
      displayName: item.get('displayName'),
      bio: item.get('bio'),
      specialties: item.get('specialties'),
      socialLinks: item.get('socialLinks'),
      status: 'published',
    });
  }
  await Audit.create({ actorId: adminId, action: `application.${input.status}`, entityId: item.id });
  return { id: item.id, status: input.status };
}
