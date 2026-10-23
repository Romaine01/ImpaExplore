import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../components/common/State';
import { PageHeading, Status } from '../../components/common/Discovery';
import { useAdminProfile, useAdminResource, useAdminSummary } from '../../features/admin/api';
import { ROLE } from '../../features/auth/roles';
import { useAuth } from '../../features/auth/AuthProvider';
import { hasRole } from '../../features/auth/roles';

type RecordValue = string | number | boolean | null | undefined | string[];
type AdminRecord = Record<string, RecordValue> & { _id?: string };

const format = (value: RecordValue) => Array.isArray(value) ? value.join(', ') || '—' : typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value == null || value === '' ? '—' : String(value);

export function AdminDashboard() {
  const query = useAdminSummary();
  const { user } = useAuth();
  return <><PageHeading title="Operations overview">A live view of the platform records that need attention.</PageHeading><State query={query}>{summary => <><div className="admin-metric-grid">
    <Link to="/admin/guide-applications"><span>Pending applications</span><strong>{summary.pendingApplications}</strong></Link>
    <Link to="/admin/bookings"><span>Pending bookings</span><strong>{summary.pendingBookings}</strong></Link>
    <Link to="/admin/guides"><span>Guide profiles</span><strong>{summary.guides}</strong></Link>
    <Link to="/admin/destinations"><span>Destinations</span><strong>{summary.destinations}</strong></Link>
    <Link to="/admin/packages"><span>Experiences</span><strong>{summary.packages}</strong></Link>
    {hasRole(user,ROLE.superAdmin)?<Link to="/admin/system/users"><span>Active users</span><strong>{summary.users}</strong></Link>:<div className="admin-metric-static"><span>Active users</span><strong>{summary.users}</strong></div>}
  </div><section className="admin-priority"><div><p className="eyebrow">Priority queue</p><h2>Review what needs a decision</h2><p>Application and booking totals are read directly from the platform database.</p></div><div className="quick-links"><Link to="/admin/guide-applications">Review guide applications <span>→</span></Link><Link to="/admin/bookings">Inspect pending bookings <span>→</span></Link><Link to="/admin/audit-logs">Open audit history <span>→</span></Link></div></section></>}</State></>;
}

const resources = {
  guides: { title:'Guides', description:'Guide profiles stored by the platform.', path:'/admin/guides', columns:[['displayName','Guide'],['status','Status'],['specialties','Specialties'],['slug','Public slug']] },
  destinations: { title:'Destinations', description:'Draft and published destination records.', path:'/admin/destinations', columns:[['name','Destination'],['status','Status'],['category','Category'],['barangay','Barangay']] },
  packages: { title:'Experiences', description:'Guide-created experience packages.', path:'/admin/packages', columns:[['title','Experience'],['status','Status'],['capacityMax','Capacity'],['priceAmount','Price amount']] },
  bookings: { title:'Bookings', description:'Booking requests and their current server status.', path:'/admin/bookings', columns:[['serviceDay','Service day'],['status','Status'],['partySize','Party size'],['requestedStartAt','Requested start']] },
  audit: { title:'Audit logs', description:'Recorded privileged and moderation events.', path:'/admin/audit-logs', columns:[['action','Action'],['actorId','Actor'],['entityId','Entity'],['createdAt','Recorded']] },
  users: { title:'Users', description:'Accounts visible only to Super Admins.', path:'/super-admin/users', columns:[['name','Name'],['email','Email'],['roles','Roles'],['status','Status']] },
} satisfies Record<string,{title:string;description:string;path:string;columns:string[][]}>;

export function AdminResourcePage({ resource }: { resource:keyof typeof resources }) {
  const config = resources[resource];
  const query = useAdminResource<AdminRecord>(resource,config.path);
  return <><PageHeading title={config.title}>{config.description}</PageHeading><State query={query}>{records => records.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{config.columns.map(([,label])=><th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{records.map((record,index)=><tr key={record._id || index}>{config.columns.map(([key])=><td key={key}>{key==='status'?<Status value={String(record[key]||'unknown')}/>:format(record[key])}</td>)}</tr>)}</tbody></table></div>:<AdminEmpty title={`No ${config.title.toLowerCase()} found`}>The database does not currently contain records for this area.</AdminEmpty>}</State></>;
}

export function AdminProfile() {
  const query=useAdminProfile();
  return <><PageHeading title="Administrator profile">Your server-verified administrator identity and access roles.</PageHeading><State query={query}>{profile=><dl className="admin-definition"><div><dt>Name</dt><dd>{profile.name}</dd></div><div><dt>Email</dt><dd>{profile.email}</dd></div><div><dt>Roles</dt><dd>{profile.roles.join(', ')}</dd></div></dl>}</State></>;
}

function AdminEmpty({title,children}:{title:string;children:ReactNode}) { return <section className="admin-empty"><span aria-hidden="true">—</span><h2>{title}</h2><p>{children}</p></section>; }

export function AdminUnavailable({ area }: { area:string }) {
  return <><PageHeading title={area}>This area is isolated inside the admin portal.</PageHeading><AdminEmpty title={`No ${area.toLowerCase()} data available`}>No backed records or management actions are available for this module yet. Nothing has been fabricated.</AdminEmpty></>;
}

export function RoleReference() {
  return <><PageHeading title="Role definitions">Canonical permissions used by the server authorization layer.</PageHeading><dl className="admin-definition"><div><dt>{ROLE.platformAdmin}</dt><dd>Platform operations, moderation, and content oversight.</dd></div><div><dt>{ROLE.superAdmin}</dt><dd>All platform-admin access plus user and system administration.</dd></div></dl></>;
}
