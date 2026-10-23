import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/httpClient';

export const useAvailability = () => useQuery({ queryKey: ['availability'], queryFn: () => api<string[]>('/guide/availability') });
export const saveAvailability = (blockedDays: string[]) =>
  api('/guide/availability', { method: 'PUT', body: JSON.stringify({ blockedDays }) });
