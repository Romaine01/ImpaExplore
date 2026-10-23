import argon2 from 'argon2';
import { User } from '../users/User.model.js';
import { failure } from '../../middleware/http.js';
import type { z } from 'zod';
import type { loginInput, registerInput } from './auth.schema.js';
import { isPrivileged, normalizeRoles, ROLE } from '../users/roles.js';
import { verifyTotp } from './totp.js';
import { Audit } from '../admin/Audit.model.js';

export async function register(input: z.infer<typeof registerInput>) {
  const email = input.email.toLowerCase();
  if (await User.exists({ email })) throw failure(409, 'Email already registered');
  return User.create({ name: input.name, email, passwordHash: await argon2.hash(input.password), roles: [ROLE.tourist] });
}

export async function login(input: z.infer<typeof loginInput>) {
  const user = await User.findOne({ email: input.email.toLowerCase() }).select('+passwordHash +mfaSecret');
  if (!user || !(await argon2.verify(String(user.get('passwordHash')), input.password)) || user.get('status') !== 'active') {
    throw failure(401, 'Invalid credentials');
  }
  if (isPrivileged(user.get('roles'))) {
    const secret = String(user.get('mfaSecret') || '');
    if (!secret || !input.mfaCode || !verifyTotp(secret, input.mfaCode)) throw failure(401, 'Invalid credentials or verification code');
  }
  return user;
}

export async function adminLogin(input: z.infer<typeof loginInput>) {
  try {
    const user = await login(input);
    if (!isPrivileged(user.get('roles'))) throw failure(401, 'Unable to access admin portal');
    return user;
  } catch {
    await Audit.create({ action: 'admin.login.denied' }).catch(() => undefined);
    throw failure(401, 'Unable to access admin portal');
  }
}

export const publicUser = (user: { id?: unknown; get: (key: string) => unknown }) =>
  ({ id: user.id, name: user.get('name'), roles: normalizeRoles(user.get('roles')) });
