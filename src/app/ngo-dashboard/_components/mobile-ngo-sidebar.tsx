
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
  HeartHandshake,
  Bell,
  Settings,
  HelpCircle,
  Calendar,
  BookOpen,
  Shield,
  MessageCircle,
  Plug,
} from 'lucide-react';

const menuItems = [
  { key: 'dashboard', label: 'Overview', to: '/ngo-dashboard', icon: <LayoutGrid size={20} /> },
  { key: 'programs', label: 'Programs & Cohorts', to: '/ngo-dashboard/programs', icon: <Library size={20} /> },
  { key: 'participants', label: 'Participants', to: '/ngo-dashboard/participants', icon: <Users size={20} /> },
  { key: 'calendar', label: 'Training Calendar', to: '/ngo-dashboard/calendar', icon: <Calendar size={20} /> },
  { key: 'assessments', label: 'Assessments', to: '/ngo-dashboard/assessments', icon: <ClipboardCheck size={20} /> },
  { key: 'employers', label: 'Employer Partners', to: '/ngo-dashboard/employers', icon: <Building size={20} /> },
  { key: 'placements', label: 'Placements & Job Pool', to: '/ngo-dashboard/placements', icon: <Briefcase size={20} /> },
  { key: 'donors', label: 'Donor Reporting', to: '/ngo-dashboard/donors', icon: <HeartHandshake size={20} /> },
  { key: 'analytics', label: 'Impact Analytics', to: '/ngo-dashboard/analytics', icon: <BarChart size={20} /> },
  { key: 'resources', label: 'Resources', to: '/ngo-dashboard/resources', icon: <BookOpen size={20} /> },
  { key: 'messages', label: 'Messages', to: '/ngo-dashboard/messages', icon: <MessageCircle size={20} /> },
  { key: 'notifications', label: 'Send Notify', to: '/ngo-dashboard/notifications', icon: <Bell size={20} /> },
  { key: 'settings', label: 'Settings', to: '/ngo-dashboard/settings', icon: <Settings size={20} /> },
  { key: 'integrations', label: 'Integrations', to: '/ngo-dashboard/integrations', icon: <Plug size={20} /> },
  { key: 'privacy', label: 'Privacy & Compliance', to: '/ngo-dashboard/privacy', icon: <Shield size={20} /> },
];

interface MobileNgoSidebarProps {
  closeSheet: () => void;
}

export default function MobileNgoSidebar({ closeSheet }: MobileNgoSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: any) => {
    return pathname === item.to;
  };

  return (
    <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
      {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.to}
            onClick={closeSheet}
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
            <div className="text-sm font-semibold">{item.label}</div>
          </Link>
      ))}
    </nav>
  );
}
