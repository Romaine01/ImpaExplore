import { useQuery } from '@tanstack/react-query';
import { api, apiEnvelope } from '../../services/httpClient';
import type { Destination } from './types';

export const useDestinations = (search = '') => useQuery({
  queryKey: ['destinations', search],
  queryFn: () => api<Destination[]>('/destinations?q=' + encodeURIComponent(search)),
});
export const useDestination = (slug?: string) => useQuery({
  queryKey: ['destination', slug],
  queryFn: () => api<Destination>('/destinations/' + slug),
});
export const useDestinationPage = (search:string,page:number) => useQuery({
  queryKey:['destinations','page',search,page],
  queryFn:()=>apiEnvelope<Destination[]>('/destinations?q='+encodeURIComponent(search)+'&page='+page),
});
