'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
  CreditCard,
  Flag,
  Cloud,
  User,
  ClipboardList,
  Bell,
  ChevronDown,
} from 'lucide-react';

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

interface MobileAdminSidebarProps {
  closeSheet: () => void;
}

export default function MobileAdminSidebar({ closeSheet }: MobileAdminSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: any) => {
    if (item.exact) return pathname === item.to;
    return pathname.startsWith(item.to);
  };

  return (
    <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
      {menuItems.map((item) => (
        <Link
          key={item.key}
          href={item.to}
          onClick={closeSheet}
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
          <div className="text-sm">{item.label}</div>
        </Link>
      ))}
      <div className="mt-auto pt-4 border-t">
        {bottomMenuItems.map((item) => (
          <Link
            key={item.key}
            href={item.to}
            onClick={closeSheet}
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
            <div className="text-sm">{item.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
