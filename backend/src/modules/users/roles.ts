export const ROLE = {
  tourist: 'tourist',
  guide: 'guide',
  platformAdmin: 'platform_admin',
  superAdmin: 'super_admin',
} as const;

export type AppRole = typeof ROLE[keyof typeof ROLE];

/** `admin` is retained only as a migration alias for existing accounts. */
export function normalizeRoles(roles: unknown): AppRole[] {
  if (!Array.isArray(roles)) return [];
  const normalized = roles.flatMap(role => role === 'admin' ? [ROLE.platformAdmin] : [role]);
  return Array.from(new Set(normalized.filter((role): role is AppRole => Object.values(ROLE).includes(role as AppRole))));
}

export function isPrivileged(roles: unknown) {
  const normalized = normalizeRoles(roles);
  return normalized.includes(ROLE.platformAdmin) || normalized.includes(ROLE.superAdmin);
}

export function hasAnyRole(roles: unknown, wanted: readonly AppRole[]) {
  const normalized = normalizeRoles(roles);
  return wanted.some(role => normalized.includes(role));
}
