import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { hasRole, isPrivilegedUser, ROLE, type AppRole } from '../features/auth/roles';

function ResolvingSession() {
  return <main className="session-resolving" id="main-content" role="status"><span className="spinner" aria-hidden="true"/>Checking your session…</main>;
}

export function RequireAuth({ loginPath = '/login' }: { loginPath?: string }) {
  const { status } = useAuth();
  const location = useLocation();
  if (status === 'resolving') return <ResolvingSession/>;
  if (status === 'unauthenticated') return <Navigate replace to={`${loginPath}?next=${encodeURIComponent(location.pathname + location.search)}`}/>;
  return <Outlet/>;
}

export function RequireRole({ roles, privileged = false }: { roles: AppRole[]; privileged?: boolean }) {
  const { user, status } = useAuth();
  if (status === 'resolving') return <ResolvingSession/>;
  if (!user) return <Navigate replace to={privileged ? '/admin/login' : '/login'}/>;
  if (!privileged && isPrivilegedUser(user)) return <Navigate replace to="/admin/dashboard"/>;
  if (!hasRole(user, ...roles)) return <Navigate replace to="/forbidden"/>;
  return <Outlet/>;
}

export function RequireApprovedGuide() {
  const { user } = useAuth();
  return hasRole(user, ROLE.guide) ? <Outlet/> : <Navigate replace to="/apply-as-guide"/>;
}

export function RedirectPrivilegedUsers() {
  const { user, status } = useAuth();
  if (status === 'resolving') return <ResolvingSession/>;
  return isPrivilegedUser(user) ? <Navigate replace to="/admin/dashboard"/> : <Outlet/>;
}

export function RedirectAuthenticatedAdmin() {
  const { user, status } = useAuth();
  if (status === 'resolving') return <ResolvingSession/>;
  return isPrivilegedUser(user) ? <Navigate replace to="/admin/dashboard"/> : <Outlet/>;
}
