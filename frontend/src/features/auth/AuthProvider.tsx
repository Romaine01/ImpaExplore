import { createContext, useContext, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { logout, useMe } from './api';
import type { User } from './types';

type AuthValue = {
  user: User | null;
  status: 'resolving' | 'authenticated' | 'unauthenticated';
  refresh: () => Promise<User | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const query = useMe();
  const client = useQueryClient();
  const user = query.data ?? null;
  const status = query.isPending ? 'resolving' : user ? 'authenticated' : 'unauthenticated';
  const refresh = async () => (await query.refetch()).data ?? null;
  const signOut = async () => { await logout(); client.clear(); };
  return <AuthContext.Provider value={{ user, status, refresh, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
