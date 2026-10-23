import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/httpClient';
import type { Experience, OwnPackage } from './types';

export const useExperiences = () => useQuery({ queryKey: ['packages'], queryFn: () => api<Experience[]>('/packages') });
export const useExperience = (slug?: string) => useQuery({ queryKey: ['package', slug], queryFn: () => api<Experience>('/packages/' + slug) });
export const useOwnPackages = () => useQuery({ queryKey: ['guidePackages'], queryFn: () => api<OwnPackage[]>('/guide/packages') });
export const createPackage = (input: unknown) => api('/guide/packages', { method: 'POST', body: JSON.stringify(input) });
export const updatePackage = (id: string, input: unknown) => api('/guide/packages/' + id, { method: 'PATCH', body: JSON.stringify(input) });
