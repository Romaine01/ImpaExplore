import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/public/HomePage';
import { Destinations } from '../pages/public/DestinationsPage';
import { DestinationDetail } from '../pages/public/DestinationDetailPage';
import { Guides } from '../pages/public/GuidesPage';
import { GuideDetail } from '../pages/public/GuideDetailPage';
import { Experiences } from '../pages/public/ExperiencesPage';
import { ExperienceDetail } from '../pages/public/ExperienceDetailPage';
import { Auth } from '../pages/auth/AuthPage';
import { Request } from '../pages/tourist/RequestPage';
import { Dashboard } from '../pages/tourist/DashboardPage';
import { ApplyGuide } from '../pages/guide/ApplyGuidePage';
import { GuideBookings } from '../pages/guide/GuideBookingsPage';
import { GuideAvailability } from '../pages/guide/GuideAvailabilityPage';
import { GuidePackages } from '../pages/guide/GuidePackagesPage';
import { Admin } from '../pages/admin/AdminPage';
import { AdminLogin } from '../pages/admin/AdminLoginPage';
import { AdminDashboard, AdminProfile, AdminResourcePage, AdminUnavailable, RoleReference } from '../pages/admin/AdminPortalPages';
import { Static } from '../pages/public/StaticPage';
import { AdminAuthLayout, AdminLayout } from '../components/layout/AdminLayouts';
import { PublicAuthLayout, PublicLayout } from '../components/layout/PublicLayout';
import { GuideLayout, TouristLayout, WorkspaceOverview } from '../components/layout/WorkspaceLayouts';
import { RedirectAuthenticatedAdmin, RedirectPrivilegedUsers, RequireApprovedGuide, RequireAuth, RequireRole } from './guards';
import { ROLE } from '../features/auth/roles';

function BarePage({ title, children }: { title:string; children:React.ReactNode }) {
  return <main id="main-content" className="bare-state"><h1>{title}</h1><p>{children}</p><Link to="/">Return to ImpaExplore</Link></main>;
}

export function AppRoutes() {
  return <Routes>
    <Route element={<RedirectPrivilegedUsers/>}>
      <Route element={<PublicLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="destinations" element={<Destinations/>}/>
        <Route path="destinations/:slug" element={<DestinationDetail/>}/>
        <Route path="guides" element={<Guides/>}/>
        <Route path="guides/:slug" element={<GuideDetail/>}/>
        <Route path="experiences" element={<Experiences/>}/>
        <Route path="experiences/:slug" element={<ExperienceDetail/>}/>
        <Route path="about" element={<Static title="About ImpaExplore">An independent platform for exploring Impasugong and connecting with local guides. We are not affiliated with the LGU, tourism office, or Department of Tourism.</Static>}/>
        <Route path="contact" element={<Static title="Contact">Platform contact details will be published before launch.</Static>}/>
        <Route path="privacy" element={<Static title="Privacy">Privacy policy pending legal review before public launch.</Static>}/>
        <Route path="terms" element={<Static title="Terms">Terms pending legal review before public launch.</Static>}/>
        <Route path="safety" element={<Static title="Travel safety">Verify access conditions, arrangements, and safety requirements before travel.</Static>}/>
        <Route path="*" element={<Static title="Page not found"><Link to="/">Return home</Link></Static>}/>
      </Route>
      <Route element={<RedirectAuthenticatedAdmin/>}><Route element={<PublicAuthLayout/>}>
        <Route path="register" element={<Auth register/>}/>
        <Route path="login" element={<Auth register={false}/>}/>
      </Route></Route>
    </Route>

    <Route element={<RequireAuth/>}><Route element={<RequireRole roles={[ROLE.tourist,ROLE.guide]}/>}><Route element={<TouristLayout/>}>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="dashboard/bookings" element={<Dashboard/>}/>
      <Route path="request" element={<Request/>}/>
      <Route path="apply-as-guide" element={<ApplyGuide/>}/>
    </Route></Route></Route>

    <Route element={<RequireAuth/>}><Route element={<RequireRole roles={[ROLE.guide]}/>}><Route element={<RequireApprovedGuide/>}><Route element={<GuideLayout/>}>
      <Route path="guide/dashboard" element={<WorkspaceOverview guide/>}/>
      <Route path="guide" element={<Navigate replace to="/guide/dashboard"/>}/>
      <Route path="guide/bookings" element={<GuideBookings/>}/>
      <Route path="guide/availability" element={<GuideAvailability/>}/>
      <Route path="guide/packages" element={<GuidePackages/>}/>
    </Route></Route></Route></Route>

    <Route element={<RedirectAuthenticatedAdmin/>}><Route element={<AdminAuthLayout/>}><Route path="admin/login" element={<AdminLogin/>}/></Route></Route>
    <Route element={<RequireAuth loginPath="/admin/login"/>}><Route element={<RequireRole privileged roles={[ROLE.platformAdmin,ROLE.superAdmin]}/>}><Route element={<AdminLayout/>}>
      <Route path="admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="admin" element={<Navigate replace to="/admin/dashboard"/>}/>
      <Route path="admin/guide-applications" element={<Admin/>}/>
      <Route path="admin/guides" element={<AdminResourcePage resource="guides"/>}/>
      <Route path="admin/destinations" element={<AdminResourcePage resource="destinations"/>}/>
      <Route path="admin/packages" element={<AdminResourcePage resource="packages"/>}/>
      <Route path="admin/bookings" element={<AdminResourcePage resource="bookings"/>}/>
      <Route path="admin/reviews" element={<AdminUnavailable area="Reviews"/>}/>
      <Route path="admin/reports" element={<AdminUnavailable area="Reports"/>}/>
      <Route path="admin/audit-logs" element={<AdminResourcePage resource="audit"/>}/>
      <Route path="admin/profile" element={<AdminProfile/>}/>
      <Route path="admin/settings" element={<AdminUnavailable area="Admin settings"/>}/>
      <Route element={<RequireRole privileged roles={[ROLE.superAdmin]}/>}>
        <Route path="admin/system/users" element={<AdminResourcePage resource="users"/>}/>
        <Route path="admin/system/roles" element={<RoleReference/>}/>
        <Route path="admin/system/administrators" element={<AdminResourcePage resource="users"/>}/>
        <Route path="admin/system/settings" element={<AdminUnavailable area="System settings"/>}/>
        <Route path="admin/system/audit-logs" element={<AdminResourcePage resource="audit"/>}/>
      </Route>
      <Route path="admin/*" element={<AdminUnavailable area="Admin page"/>}/>
    </Route></Route></Route>

    <Route element={<RequireAuth loginPath="/admin/login"/>}><Route element={<RequireRole privileged roles={[ROLE.superAdmin]}/>}>
      <Route path="super-admin/*" element={<Navigate replace to="/admin/system/users"/>}/>
    </Route></Route>

    <Route path="forbidden" element={<BarePage title="Access unavailable">Your account does not have permission to open this workspace.</BarePage>}/>
    <Route path="*" element={<BarePage title="Page not found">The page you requested does not exist.</BarePage>}/>
  </Routes>;
}
