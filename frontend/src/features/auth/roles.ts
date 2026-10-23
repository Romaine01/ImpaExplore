import type { User } from './types';

export const ROLE = {
  tourist: 'tourist',
  guide: 'guide',
  platformAdmin: 'platform_admin',
  superAdmin: 'super_admin',
} as const;

export type AppRole = typeof ROLE[keyof typeof ROLE];
export const privilegedRoles: AppRole[] = [ROLE.platformAdmin, ROLE.superAdmin];

export function hasRole(user: User | null, ...roles: AppRole[]) {
  return Boolean(user && roles.some(role => user.roles.includes(role)));
}

export function isPrivilegedUser(user: User | null) {
  return hasRole(user, ...privilegedRoles);
}

export function postLoginPath(user: User, requested?: string | null) {
  if (isPrivilegedUser(user)) return '/admin/dashboard';
  const safeRequested = requested?.startsWith('/') && !requested.startsWith('//') ? requested : null;
  if (safeRequested?.startsWith('/admin')) return hasRole(user, ROLE.superAdmin, ROLE.platformAdmin) ? safeRequested : '/dashboard';
  if (safeRequested?.startsWith('/guide')) return hasRole(user, ROLE.guide) ? safeRequested : '/dashboard';
  return safeRequested || (hasRole(user, ROLE.guide) ? '/guide/dashboard' : '/dashboard');
}
