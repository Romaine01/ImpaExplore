import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/httpClient';
import type { Guide } from './types';

export const useGuides = () => useQuery({ queryKey: ['guides'], queryFn: () => api<Guide[]>('/guides') });
export const useGuide = (slug?: string) => useQuery({ queryKey: ['guide', slug], queryFn: () => api<Guide>('/guides/' + slug) });
