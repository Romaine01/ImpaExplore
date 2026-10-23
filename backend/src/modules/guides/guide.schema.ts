import { z } from 'zod';

export const guideProfileInput = z.object({
  displayName: z.string().min(2).max(100),
  bio: z.string().min(20).max(3000),
  specialties: z.array(z.string().min(2).max(60)).max(20),
  socialLinks: z.array(z.object({
    platform: z.enum(['facebook', 'instagram', 'tiktok', 'youtube']),
    url: z.url().startsWith('https://'),
  })).max(8),
});
