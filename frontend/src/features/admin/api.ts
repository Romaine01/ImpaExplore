import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/httpClient';

export type GuideApplication = { _id: string; displayName: string; bio: string; status: string };
export const useGuideApplications = () => useQuery({
  queryKey: ['applications'],
  queryFn: () => api<GuideApplication[]>('/admin/guide-applications'),
});
export const reviewApplication = (id: string, status: 'approved' | 'rejected', reason: string) =>
  api('/admin/guide-applications/' + id + '/review', { method: 'PATCH', body: JSON.stringify({ status, reason }) });

export type AdminSummary = { users:number; guides:number; pendingApplications:number; destinations:number; packages:number; pendingBookings:number };
export const useAdminSummary = () => useQuery({ queryKey:['admin','dashboard'], queryFn:()=>api<AdminSummary>('/admin/dashboard') });
export const useAdminResource = <T,>(name:string,path:string) => useQuery({ queryKey:['admin',name], queryFn:()=>api<T[]>(path) });
export const useAdminProfile = () => useQuery({ queryKey:['admin','profile'], queryFn:()=>api<{id:string;name:string;email:string;roles:string[]}>('/admin/profile') });
