import { ROLE } from '../features/auth/roles';

export const publicNavigation = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/guides', label: 'Find Guides' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/about', label: 'About' },
];

export const touristNavigation = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/dashboard/bookings', label: 'Booking requests' },
  { to: '/apply-as-guide', label: 'Become a guide' },
];

export const guideNavigation = [
  { to: '/guide/dashboard', label: 'Overview' },
  { to: '/guide/bookings', label: 'Booking requests' },
  { to: '/guide/availability', label: 'Availability' },
  { to: '/guide/packages', label: 'Experiences' },
];

export const adminNavigation = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/guide-applications', label: 'Guide applications' },
  { to: '/admin/guides', label: 'Guides' },
  { to: '/admin/destinations', label: 'Destinations' },
  { to: '/admin/packages', label: 'Experiences' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/audit-logs', label: 'Audit logs' },
  { to: '/admin/profile', label: 'Profile' },
  { to: '/admin/settings', label: 'Settings' },
];

export const superAdminNavigation = [
  { to: '/admin/system/users', label: 'Users', role: ROLE.superAdmin },
  { to: '/admin/system/roles', label: 'Roles', role: ROLE.superAdmin },
  { to: '/admin/system/administrators', label: 'Administrators', role: ROLE.superAdmin },
  { to: '/admin/system/settings', label: 'System settings', role: ROLE.superAdmin },
  { to: '/admin/system/audit-logs', label: 'System audit', role: ROLE.superAdmin },
];
