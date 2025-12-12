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

interface MobileCollegeSidebarProps {
  closeSheet: () => void;
}

export default function MobileCollegeSidebar({ closeSheet }: MobileCollegeSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: any) => {
    if (item.exact) {
      return pathname === item.to;
    }
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
    </nav>
  );
}
