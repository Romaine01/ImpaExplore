import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { touristNavigation, guideNavigation } from '../../app/navigation';
import { useAuth } from '../../features/auth/AuthProvider';

function WorkspaceLayout({ label, links }: { label: string; links: { to: string; label: string }[] }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const leave = async () => { setBusy(true); try { await signOut(); navigate('/login'); } finally { setBusy(false); } };
  return <div className="role-shell">
    <aside className="role-sidebar">
      <Link className="brand" to="/">ImpaExplore</Link>
      <p className="workspace-label">{label}</p>
      <nav aria-label={`${label} navigation`}>{links.map(link => <NavLink key={link.to} to={link.to} end>{link.label}</NavLink>)}</nav>
      <Link className="role-site-link" to="/destinations">Explore the public site</Link>
    </aside>
    <div className="role-workspace">
      <header className="role-topbar"><div><span className="topbar-context">{label}</span><strong>{user?.name}</strong></div><button className="secondary compact-button" disabled={busy} onClick={leave}>{busy ? 'Signing out…' : 'Sign out'}</button></header>
      <main id="main-content" tabIndex={-1} className="role-main"><Outlet/></main>
    </div>
  </div>;
}

export function TouristLayout() { return <WorkspaceLayout label="Tourist workspace" links={touristNavigation}/>; }
export function GuideLayout() { return <WorkspaceLayout label="Guide workspace" links={guideNavigation}/>; }

export function WorkspaceOverview({ guide = false }: { guide?: boolean }) {
  return <section className="workspace-welcome"><p className="eyebrow">{guide ? 'Guide workspace' : 'Your account'}</p><h1>{guide ? 'Guide overview' : 'Your travel plans'}</h1><p>{guide ? 'Manage requests, availability, and published experiences from one focused workspace.' : 'Review your booking requests and continue planning your next Impasugong experience.'}</p><div className="quick-links">{(guide ? guideNavigation.slice(1) : touristNavigation.slice(1)).map(link => <Link key={link.to} to={link.to}>{link.label}<span aria-hidden="true">→</span></Link>)}</div></section>;
}
