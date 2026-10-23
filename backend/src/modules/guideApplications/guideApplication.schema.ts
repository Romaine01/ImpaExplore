import { z } from 'zod';

export const applicationInput = z.object({
  displayName: z.string().min(2),
  bio: z.string().min(20),
  specialties: z.array(z.string()).default([]),
  socialLinks: z.array(z.object({
    platform: z.enum(['facebook', 'instagram', 'tiktok', 'youtube']),
    url: z.url().startsWith('https://'),
  })).default([]),
});
export const reviewInput = z.object({
  status: z.enum(['approved', 'rejected']),
  reason: z.string().min(3),
});
