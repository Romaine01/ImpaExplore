import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
export function UpdateNotice(){const [dismissed,setDismissed]=useState(false);const {needRefresh:[needed],updateServiceWorker}=useRegisterSW();if(!needed||dismissed)return null;return <div className="update-notice" role="status"><p>A new version is ready. Save any unfinished form before updating.</p><button onClick={()=>updateServiceWorker(true)}>Update now</button><button className="secondary" onClick={()=>setDismissed(true)}>Later</button></div>;}
