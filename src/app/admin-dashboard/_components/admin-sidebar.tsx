

'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  Briefcase,
  ShieldCheck,
  BarChart,
  HeartPulse,
  Settings,
  LifeBuoy,
  Building,
  FileText,
  CreditCard,
  Flag,
  Cloud,
  User,
  ClipboardList,
  Bell,
} from 'lucide-react';
import {
  Sidebar,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    key: 'overview',
    label: 'Overview',
    to: '/admin-dashboard',
    exact: true,
    icon: <LayoutGrid size={20} />,
  },
  {
    key: 'users',
    label: 'Users & Roles',
    to: '/admin-dashboard/users',
    icon: <Users size={20} />,
  },
   {
    key: 'tenants',
    label: 'Tenants',
    to: '/admin-dashboard/tenants',
    icon: <Building size={20} />,
  },
  {
    key: 'jobs',
    label: 'Jobs & Moderation',
    to: '/admin-dashboard/jobs',
    icon: <Briefcase size={20} />,
  },
  {
    key: 'quizzes',
    label: 'Quizzes',
    to: '/admin-dashboard/quizzes',
    icon: <ClipboardList size={20} />,
  },
   {
    key: 'applicants',
    label: 'Applicants & Fraud',
    to: '/admin-dashboard/applicants',
    icon: <Users size={20} />,
  },
  {
    key: 'reports-and-appeals',
    label: 'Reports & Appeals',
    to: '/admin-dashboard/moderation',
    icon: <ShieldCheck size={20} />,
  },
   {
    key: 'billing',
    label: 'Billing & Credits',
    to: '/admin-dashboard/billing',
    icon: <CreditCard size={20} />,
  },
   {
    key: 'feature-flags',
    label: 'Feature Flags',
    to: '/admin-dashboard/feature-flags',
    icon: <Flag size={20} />,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    to: '/admin-dashboard/analytics',
    icon: <BarChart size={20} />,
  },
  {
    key: 'notifications',
    label: 'Push Notifications',
    to: '/admin-dashboard/notifications',
    icon: <Bell size={20} />,
  },
  {
    key: 'health',
    label: 'System Health',
    to: '/admin-dashboard/health',
    icon: <HeartPulse size={20} />,
  },
   {
    key: 'functions',
    label: 'Cloud Functions',
    to: '/admin-dashboard/functions',
    icon: <Cloud size={20} />,
  },
  {
    key: 'settings',
    label: 'Admin Settings',
    to: '/admin-dashboard/settings',
    icon: <Settings size={20} />,
  },
  {
    key: 'support',
    label: 'Support Tickets',
    to: '/admin-dashboard/support',
    icon: <LifeBuoy size={20} />,
  },
];

const bottomMenuItems = [
    {
      key: 'profile',
      label: 'My Profile',
      to: '/admin-dashboard/profile',
      icon: <User size={20} />,
    },
]

function AdminSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const isItemActive = (item: any) => {
    if (item.exact) {
      return pathname === item.to;
    }
    return pathname.startsWith(item.to);
  };

  return (
    <Sidebar className="flex flex-col bg-white border-r border-slate-200">
       <Link
        href="/admin-dashboard"
        className="flex items-center gap-3 px-3 py-4 hover:bg-slate-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            ZK
        </div>
        {sidebarState === 'expanded' && (
          <div className="overflow-hidden">
            <div className="font-semibold">Zekkers Admin</div>
            <div className="text-xs text-slate-500 truncate">Platform Control</div>
          </div>
        )}
      </Link>

      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.to}
              className={`group flex items-center gap-3 p-2 rounded-md ${
                isItemActive(item) ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div
                className={`text-slate-500 group-hover:text-primary ${
                  isItemActive(item) ? 'text-primary' : ''
                }`}
              >
                {item.icon}
              </div>
              {sidebarState === 'expanded' && (
                <div className="text-sm">{item.label}</div>
              )}
            </Link>
          )
        )}
      </nav>
      <div className="mt-auto">
      <nav className="flex flex-col gap-1 p-2">
        {bottomMenuItems.map((item) => (
            <Link
              key={item.key}
              href={item.to}
              className={`group flex items-center gap-3 p-2 rounded-md ${
                isItemActive(item) ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div
                className={`text-slate-500 group-hover:text-primary ${
                  isItemActive(item) ? 'text-primary' : ''
                }`}
              >
                {item.icon}
              </div>
              {sidebarState === 'expanded' && (
                <div className="text-sm">{item.label}</div>
              )}
            </Link>
          )
        )}
      </nav>
      </div>
    </Sidebar>
  );
}
export default AdminSidebar;
