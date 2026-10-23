import { useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { publicNavigation } from '../../app/navigation';
import { useAuth } from '../../features/auth/AuthProvider';
import { hasRole, ROLE } from '../../features/auth/roles';

export function SiteHeader() {
  const { user, signOut: logout } = useAuth();
  const navigate = useNavigate();
  const menu = useRef<HTMLDetailsElement>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const signOut = async () => {
    setBusy(true);
    try { await logout(); navigate('/'); }
    catch (reason) { setError((reason as Error).message); }
    finally { setBusy(false); }
  };
  const actions = user ? <>
    <Link to="/dashboard">My bookings</Link>
    {hasRole(user, ROLE.guide) && <Link to="/guide/dashboard">Guide workspace</Link>}
    <button className="secondary" disabled={busy} onClick={signOut}>{busy ? 'Signing out…' : 'Sign out'}</button>
  </> : <><Link to="/login">Sign in</Link><Link className="button" to="/register">Get started</Link></>;
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav className="site-nav" aria-label="Main navigation">
      <Link className="brand" to="/">ImpaExplore</Link>
      <div className="nav-links">{publicNavigation.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</div>
      <div className="nav-actions">{actions}</div>
      <details ref={menu} className="mobile-menu" onKeyDown={event => { if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}>
        <summary>Menu</summary>
        <div className="mobile-links" onClick={event => { if ((event.target as HTMLElement).closest('a') && menu.current) menu.current.open = false; }}>
          {publicNavigation.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          {actions}
        </div>
      </details>
    </nav>
    {error && <p className="feedback error" role="alert">{error}</p>}
  </header>;
}
