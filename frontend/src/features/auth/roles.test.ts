import { describe, expect, it } from 'vitest';
import { isPrivilegedUser, postLoginPath } from './roles';
import type { User } from './types';

const user = (roles:string[]):User => ({id:'1',name:'Test',roles});

describe('role route resolution',()=>{
  it('gives privileged roles precedence over requested public routes',()=>{
    expect(postLoginPath(user(['tourist','platform_admin']),'/destinations')).toBe('/admin/dashboard');
    expect(isPrivilegedUser(user(['super_admin']))).toBe(true);
  });
  it('does not let tourists use an intended guide or admin route',()=>{
    expect(postLoginPath(user(['tourist']),'/guide/bookings')).toBe('/dashboard');
    expect(postLoginPath(user(['tourist']),'/admin/dashboard')).toBe('/dashboard');
  });
  it('preserves an authorized guide route',()=>{
    expect(postLoginPath(user(['tourist','guide']),'/guide/bookings')).toBe('/guide/bookings');
  });
});
