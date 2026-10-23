import { z } from 'zod';

export const env = z.object({
  MONGODB_URI: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  FRONTEND_ORIGIN: z.url(),
  PORT: z.coerce.number().default(5001),
}).parse(process.env);
