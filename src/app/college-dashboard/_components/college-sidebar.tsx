

'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  Library,
  Briefcase,
  ClipboardCheck,
  Building,
  BarChart,
  BrainCircuit,
  Bell,
  Settings,
  Download,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import {
  Sidebar,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    to: '/college-dashboard',
    icon: <LayoutGrid size={20} />,
    exact: true,
  },
  {
    key: 'students',
    label: 'Students',
    to: '/college-dashboard/students',
    icon: <Users size={20} />,
  },
  {
    key: 'courses',
    label: 'Batches & Courses',
    to: '/college-dashboard/courses',
    icon: <Library size={20} />,
  },
  {
    key: 'drives',
    label: 'Placement Drives',
    to: '/college-dashboard/drives',
    icon: <Briefcase size={20} />,
  },
  {
    key: 'assessments',
    label: 'Assessment Center',
    to: '/college-dashboard/assessments',
    icon: <ClipboardCheck size={20} />,
  },
  {
    key: 'employers',
    label: 'Employer Partners',
    to: '/college-dashboard/employers',
    icon: <Building size={20} />,
  },
  {
    key: 'analytics',
    label: 'Analytics & Insights',
    to: '/college-dashboard/analytics',
    icon: <BarChart size={20} />,
  },
  {
    key: 'roadmap',
    label: 'AI Roadmap Analytics',
    to: '/college-dashboard/roadmap',
    icon: <BrainCircuit size={20} />,
  },
  {
    key: 'messages',
    label: 'Messages',
    to: '/college-dashboard/messages',
    icon: <MessageSquare size={20} />,
  },
  {
    key: 'notifications',
    label: 'Notifications & Alerts',
    to: '/college-dashboard/notifications',
    icon: <Bell size={20} />,
  },
  {
    key: 'settings',
    label: 'Settings & Integrations',
    to: '/college-dashboard/settings',
    icon: <Settings size={20} />,
  },
  {
    key: 'exports',
    label: 'Exports & Reports',
    to: '/college-dashboard/exports',
    icon: <Download size={20} />,
  },
  {
    key: 'support',
    label: 'Support & Help',
    to: '/college-dashboard/support',
    icon: <HelpCircle size={20} />,
  },
];

function CollegeSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const isItemActive = (item: any) => {
    if (item.exact) {
      return pathname === item.to;
    }
    return pathname.startsWith(item.to);
  };

  return (
    <Sidebar className="flex flex-col">
       <Link
        href="/college-dashboard"
        className="flex items-center gap-3 px-3 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            ZK
        </div>
        {sidebarState === 'expanded' && (
          <div className="overflow-hidden">
            <div className="font-semibold">ABC University</div>
            <div className="text-xs text-slate-500 truncate">College Panel</div>
          </div>
        )}
      </Link>

      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.to}
              className={`group flex items-center gap-3 p-2 rounded-md ${
                isItemActive(item) ? 'bg-slate-100' : 'hover:bg-slate-50'
              }`}
            >
              <div
                className={`text-slate-600 group-hover:text-primary ${
                  isItemActive(item) ? 'text-primary' : ''
                }`}
              >
                {item.icon}
              </div>
              {sidebarState === 'expanded' && (
                <div className="text-sm font-semibold">{item.label}</div>
              )}
            </Link>
          )
        )}
      </nav>
    </Sidebar>
  );
}
export default CollegeSidebar;
