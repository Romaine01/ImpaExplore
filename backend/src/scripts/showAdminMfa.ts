import 'dotenv/config';
import { z } from 'zod';

const config = z.object({
  ADMIN_EMAIL: z.email().default('admin@impaexplore.local'),
  ADMIN_MFA_SECRET: z.string().regex(/^[A-Z2-7]{16,}$/),
}).parse(process.env);

const label = encodeURIComponent(`ImpaExplore:${config.ADMIN_EMAIL}`);
const issuer = encodeURIComponent('ImpaExplore');
console.log('Add a time-based account to your authenticator using this private secret:');
console.log(config.ADMIN_MFA_SECRET);
console.log('\nAuthenticator URI:');
console.log(`otpauth://totp/${label}?secret=${config.ADMIN_MFA_SECRET}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`);
