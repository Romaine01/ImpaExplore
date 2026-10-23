import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/httpClient';
import type { Booking } from './types';

export const useOwnBookings = () => useQuery({ queryKey: ['bookings'], queryFn: () => api<Booking[]>('/bookings/mine') });
export const useGuideBookings = () => useQuery({ queryKey: ['guideBookings'], queryFn: () => api<Booking[]>('/guide/bookings') });
export const requestBooking = (input: unknown) => api('/bookings', { method: 'POST', body: JSON.stringify(input) });
export const cancelBooking = (id: string) => api('/bookings/' + id + '/cancel', { method: 'PATCH' });
export const respondToBooking = (id: string, status: 'CONFIRMED' | 'DECLINED') =>
  api('/guide/bookings/' + id + '/respond', { method: 'PATCH', body: JSON.stringify({ status }) });
