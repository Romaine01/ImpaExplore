import { z } from 'zod';

export const registerInput = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(12).max(128),
});
export const loginInput = z.object({ email: z.email(), password: z.string(), mfaCode: z.preprocess(value => value === '' ? undefined : value, z.string().regex(/^\d{6}$/).optional()) });
export const adminLoginInput = loginInput.extend({ mfaCode: z.string().regex(/^\d{6}$/) });
