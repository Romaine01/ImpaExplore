import { describe, expect, it } from 'vitest';
import { hasAnyRole, isPrivileged, normalizeRoles, ROLE } from './roles.js';

describe('role precedence and migration', () => {
  it('normalizes the legacy admin role to platform_admin', () => {
    expect(normalizeRoles(['tourist', 'admin'])).toEqual(['tourist', 'platform_admin']);
  });
  it('recognizes both privileged roles', () => {
    expect(isPrivileged([ROLE.platformAdmin])).toBe(true);
    expect(isPrivileged([ROLE.superAdmin])).toBe(true);
    expect(isPrivileged([ROLE.guide])).toBe(false);
  });
  it('matches only explicitly accepted roles', () => {
    expect(hasAnyRole([ROLE.platformAdmin], [ROLE.platformAdmin, ROLE.superAdmin])).toBe(true);
    expect(hasAnyRole([ROLE.guide], [ROLE.platformAdmin, ROLE.superAdmin])).toBe(false);
  });
});
