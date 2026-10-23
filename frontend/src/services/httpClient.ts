const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1';
export type ApiEnvelope<T> = { data:T; meta?:{page:number;total:number;limit:number} };
export async function apiEnvelope<T>(path:string,options:RequestInit={}):Promise<ApiEnvelope<T>>{
  if(options.method && !['GET','HEAD'].includes(options.method) && typeof navigator!=='undefined' && !navigator.onLine) throw new Error('Reconnect before saving changes.');
  const response=await fetch(base+path,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
  if(!response.ok){const body=await response.json().catch(()=>({}));throw new Error(body.error?.message||'Request failed');}
  if(response.status===204)return {data:undefined as T};
  return response.json();
}
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{return (await apiEnvelope<T>(path,options)).data;}
