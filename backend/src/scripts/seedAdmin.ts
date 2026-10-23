import 'dotenv/config';
import argon2 from 'argon2';
import mongoose from 'mongoose';
import { z } from 'zod';
import { User } from '../modules/users/User.model.js';
import { connectDatabase } from '../db/connect.js';
import { ROLE } from '../modules/users/roles.js';

const seedConfig = z.object({
  ADMIN_EMAIL: z.email().default('admin@impaexplore.local'),
  ADMIN_PASSWORD: z.string().min(12, 'ADMIN_PASSWORD must contain at least 12 characters'),
  ADMIN_MFA_SECRET: z.string().regex(/^[A-Z2-7]{16,}$/,'ADMIN_MFA_SECRET must be a base32 TOTP secret'),
  ADMIN_RESET_PASSWORD: z.enum(['true', 'false']).default('false').transform(value => value === 'true'),
}).parse(process.env);

await connectDatabase();
try {
  const email = seedConfig.ADMIN_EMAIL.toLowerCase();
  const existing = await User.findOne({ email }).select('+passwordHash');
  if (existing) {
    const roles = existing.get('roles') as string[];
    existing.set({
      roles: Array.from(new Set([...roles.filter(role => role !== 'admin'), ROLE.platformAdmin])),
      status: 'active',
      mfaSecret: seedConfig.ADMIN_MFA_SECRET,
      ...(seedConfig.ADMIN_RESET_PASSWORD ? { passwordHash: await argon2.hash(seedConfig.ADMIN_PASSWORD) } : {}),
    });
    await existing.save();
    console.log('Admin role ensured for ' + email + '. Existing password was preserved.');
  } else {
    await User.create({ name: 'ImpaExplore Admin', email, passwordHash: await argon2.hash(seedConfig.ADMIN_PASSWORD), mfaSecret: seedConfig.ADMIN_MFA_SECRET, roles: [ROLE.platformAdmin], status: 'active' });
    console.log('Default admin account created for ' + email + '.');
  }
} finally {
  await mongoose.disconnect();
}
