import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/httpClient';
import type { User } from './types';

export const useMe = () => useQuery({ queryKey: ['me'], queryFn: () => api<User>('/auth/me'), retry: false });
export const submitAuth = (register: boolean, values: unknown) =>
  api<User>('/auth/' + (register ? 'register' : 'login'), { method: 'POST', body: JSON.stringify(values) });
export const submitAdminAuth = (values: unknown) =>
  api<User>('/auth/admin/login', { method: 'POST', body: JSON.stringify(values) });
export const logout = () => api('/auth/logout', { method: 'POST' });
