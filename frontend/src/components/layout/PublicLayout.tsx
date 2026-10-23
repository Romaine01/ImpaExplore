import { Outlet } from 'react-router-dom';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { OfflineNotice } from '../../pwa/OfflineNotice';
import { UpdateNotice } from '../../pwa/UpdateNotice';

export function PublicLayout() {
  return <><SiteHeader/><OfflineNotice/><UpdateNotice/><main id="main-content" tabIndex={-1}><Outlet/></main><SiteFooter/></>;
}

export function PublicAuthLayout() {
  return <div className="auth-shell"><header className="auth-shell-header"><a className="brand" href="/">ImpaExplore</a><span>Secure account access</span></header><main id="main-content" tabIndex={-1}><Outlet/></main></div>;
}
