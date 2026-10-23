import { useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { adminNavigation, superAdminNavigation } from '../../app/navigation';
import { useAuth } from '../../features/auth/AuthProvider';
import { hasRole, ROLE } from '../../features/auth/roles';
import { OfflineNotice } from '../../pwa/OfflineNotice';
import { UpdateNotice } from '../../pwa/UpdateNotice';

export function AdminAuthLayout() {
  return <div className="admin-auth-shell"><header><Link className="brand" to="/admin/login">ImpaExplore <span>Admin</span></Link></header><main id="main-content" tabIndex={-1}><Outlet/></main><footer>Authorized ImpaExplore personnel only.</footer></div>;
}

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = useMemo(() => hasRole(user, ROLE.superAdmin) ? [...adminNavigation, ...superAdminNavigation] : adminNavigation, [user]);
  const active = links.filter(link => location.pathname === link.to || location.pathname.startsWith(link.to + '/')).at(-1);
  const leave = async () => { setBusy(true); try { await signOut(); navigate('/admin/login', { replace: true }); } finally { setBusy(false); } };
  return <div className="admin-shell">
    <aside id="admin-navigation" className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`}>
      <div className="admin-brand"><span>ImpaExplore</span><small>Administration</small></div>
      <nav aria-label="Administration navigation" onClick={() => setMenuOpen(false)}>{links.map(link => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}</nav>
      <div className="admin-sidebar-foot"><span>{hasRole(user, ROLE.superAdmin) ? 'Super Admin' : 'Platform Admin'}</span><small>Independent platform operations</small></div>
    </aside>
    {menuOpen && <button className="admin-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)}/>} 
    <div className="admin-workspace">
      <OfflineNotice/><UpdateNotice/>
      <header className="admin-topbar"><button className="admin-menu-button secondary" aria-expanded={menuOpen} aria-controls="admin-navigation" onClick={() => setMenuOpen(value => !value)}>Menu</button><div><span>Administration</span><strong>{active?.label || 'Admin portal'}</strong></div><details className="admin-account"><summary>{user?.name}</summary><div><Link to="/admin/profile">Profile</Link><button disabled={busy} onClick={leave}>{busy ? 'Signing out…' : 'Sign out'}</button></div></details></header>
      <main id="main-content" tabIndex={-1} className="admin-main"><Outlet/></main>
    </div>
  </div>;
}
