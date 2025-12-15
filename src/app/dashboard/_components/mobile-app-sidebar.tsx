
'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  LayoutGrid,
  User,
  Users,
  Briefcase,
  Sparkles,
  Trophy,
  BookOpen,
  FileText,
  Award,
  MessageSquare,
  Settings,
  Map,
  Lightbulb,
  FileUp,
  BrainCircuit,
  MessageCircleQuestion,
  GraduationCap,
  ClipboardCheck,
  Library,
  FolderKanban,
  Heart,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  UserCheck,
  Building2,
  FileUser,
  Shield,
  BarChart3,
  CreditCard,
  Bell,
  LifeBuoy,
  Flag,
  Activity,
  Terminal,
  Calendar,
  Building,
  BarChart,
  HeartHandshake,
  Plug,
} from 'lucide-react';
import { menuItems as globalEmployerMenuItems } from '@/app/global-employers-dashboard/_components/menu-items';

const studentMenuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    to: '/dashboard',
    icon: <LayoutGrid size={20} />,
  },
  {
    key: 'profile',
    label: 'My Profile',
    to: '/dashboard/profile',
    icon: <User size={20} />,
  },
  { key: 'jobs', label: 'Jobs', to: '/dashboard/jobs', icon: <Briefcase size={20} /> },
  {
    key: 'roadmap',
    label: 'AI Roadmap',
    to: '/dashboard/roadmap',
    icon: <Map size={20} />,
  },
  {
    key: 'ai-mentor',
    label: 'AI Mentor',
    to: '/dashboard/ai-mentor', // Parent link for active state checking
    icon: <Sparkles size={20} />,
    subItems: [
      {
        key: 'skill-gap',
        label: 'Skill Gap Analysis',
        to: '/dashboard/skill-gap',
        icon: <Lightbulb size={16} />,
      },
      {
        key: 'resume-ai',
        label: 'Resume AI',
        to: '/dashboard/resume-ai',
        icon: <FileUp size={16} />,
      },
      {
        key: 'interview-ai',
        label: 'Interview AI',
        to: '/dashboard/interview-ai',
        icon: <BrainCircuit size={16} />,
      },
      {
        key: 'study-ai',
        label: 'Study AI',
        to: '/dashboard/ask-ai',
        icon: <MessageCircleQuestion size={16} />,
      },
    ],
  },
  {
    key: 'competitions',
    label: 'Competitions',
    to: '/dashboard/competitions',
    icon: <Trophy size={20} />,
  },
  {
    key: 'preparation-hub',
    label: 'Preparation Hub',
    to: '/dashboard/preparation-hub', // Parent link for active state checking
    icon: <BookOpen size={20} />,
    subItems: [
      {
        key: 'exams',
        label: 'Exams',
        to: '/dashboard/exams',
        icon: <GraduationCap size={16} />,
      },
      {
        key: 'mock-tests',
        label: 'Mock Tests',
        to: '/dashboard/mock-tests',
        icon: <ClipboardCheck size={16} />,
      },
      {
        key: 'study-materials',
        label: 'Study Materials',
        to: '/dashboard/study-materials',
        icon: <Library size={16} />,
      },
       {
        key: 'quiz',
        label: 'Quiz',
        to: '/dashboard/quiz',
        icon: <ClipboardList size={16} />,
      }
    ],
  },
  {
    key: 'vault',
    label: 'Documents Vault',
    to: '/dashboard/vault',
    icon: <FolderKanban size={20} />,
  },
  {
    key: 'applications',
    label: 'Applications',
    to: '/dashboard/applications',
    icon: <FileText size={20} />,
  },
  {
    key: 'achievements',
    label: 'Achievements',
    to: '/dashboard/achievements',
    icon: <Award size={20} />,
  },
  {
    key: 'messages',
    label: 'Messages',
    to: '/dashboard/messages',
    icon: <MessageSquare size={20} />,
  },
  {
    key: 'saved-jobs',
    label: 'Saved Jobs',
    to: '/dashboard/saved-jobs',
    icon: <Heart size={20} />,
  },
  {
    key: 'settings',
    label: 'Settings',
    to: '/dashboard/settings',
    icon: <Settings size={20} />,
  },
];

const adminMenuItems = [
  { key: 'dashboard', label: 'Dashboard', to: '/admin-dashboard', icon: <LayoutDashboard size={20} /> },
  { key: 'users', label: 'Users', to: '/admin-dashboard/users', icon: <Users size={20} /> },
  { key: 'verification', label: 'Verification', to: '/admin-dashboard/verification', icon: <UserCheck size={20} /> },
  { key: 'tenants', label: 'Tenants', to: '/admin-dashboard/tenants', icon: <Building2 size={20} /> },
  { key: 'jobs', label: 'Job Moderation', to: '/admin-dashboard/jobs', icon: <Briefcase size={20} /> },
  { key: 'applicants', label: 'Applicants', to: '/admin-dashboard/applicants', icon: <FileUser size={20} /> },
  { key: 'quizzes', label: 'Quizzes', to: '/admin-dashboard/quizzes', icon: <BrainCircuit size={20} /> },
  { key: 'moderation', label: 'Moderation', to: '/admin-dashboard/moderation', icon: <Shield size={20} /> },
  { key: 'analytics', label: 'Analytics', to: '/admin-dashboard/analytics', icon: <BarChart3 size={20} /> },
  { key: 'billing', label: 'Billing', to: '/admin-dashboard/billing', icon: <CreditCard size={20} /> },
  { key: 'notifications', label: 'Notifications', to: '/admin-dashboard/notifications', icon: <Bell size={20} /> },
  { key: 'support', label: 'Support', to: '/admin-dashboard/support', icon: <LifeBuoy size={20} /> },
  { key: 'feature-flags', label: 'Feature Flags', to: '/admin-dashboard/feature-flags', icon: <Flag size={20} /> },
  { key: 'health', label: 'Health', to: '/admin-dashboard/health', icon: <Activity size={20} /> },
  { key: 'functions', label: 'Functions', to: '/admin-dashboard/functions', icon: <Terminal size={20} /> },
  { key: 'settings', label: 'Settings', to: '/admin-dashboard/settings', icon: <Settings size={20} /> },
];

const ngoMenuItems = [
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
  { key: 'messages', label: 'Messages', to: '/ngo-dashboard/messages', icon: <MessageSquare size={20} /> },
  { key: 'notifications', label: 'Send Notify', to: '/ngo-dashboard/notifications', icon: <Bell size={20} /> },
  { key: 'settings', label: 'Settings', to: '/ngo-dashboard/settings', icon: <Settings size={20} /> },
  { key: 'integrations', label: 'Integrations', to: '/ngo-dashboard/integrations', icon: <Plug size={20} /> },
  { key: 'privacy', label: 'Privacy & Compliance', to: '/ngo-dashboard/privacy', icon: <Shield size={20} /> },
];

interface MobileAppSidebarProps {
  closeSheet: () => void;
}

export default function MobileAppSidebar({ closeSheet }: MobileAppSidebarProps) {
  const pathname = usePathname();

  const menuItems = useMemo(() => {
    if (pathname.startsWith('/admin-dashboard')) {
      return adminMenuItems;
    }
    if (pathname.startsWith('/ngo-dashboard')) {
      return ngoMenuItems;
    }
    if (pathname.startsWith('/global-employers-dashboard')) {
      return globalEmployerMenuItems;
    }
    return studentMenuItems;
  }, [pathname]);

  const isItemActive = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => pathname.startsWith(sub.to));
    }
    if (item.to) {
        return pathname.startsWith(item.to);
    }
    return false;
  };

  return (
    <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
      {menuItems.map((item) =>
        item.subItems ? (
          <Collapsible key={item.key} defaultOpen={isItemActive(item)}>
            <CollapsibleTrigger
              className={`group flex items-center justify-between w-full gap-3 p-2 rounded-md hover:bg-slate-100 ${
                isItemActive(item) ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`text-slate-500 group-hover:text-primary ${
                    isItemActive(item) ? 'text-primary' : ''
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-sm">{item.label}</div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6">
              <div className="flex flex-col gap-1 mt-1 border-l-2 border-slate-200 pl-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.key}
                    href={subItem.to}
                    onClick={closeSheet}
                    className={`group flex items-center gap-3 p-2 rounded-md text-sm ${
                      pathname === subItem.to
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div
                      className={`text-slate-400 group-hover:text-primary ${
                        pathname === subItem.to ? 'text-primary' : ''
                      }`}
                    >
                      {subItem.icon}
                    </div>
                    <div className="text-xs">
                      {subItem.label}
                    </div>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ) : (
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
        )
      )}
    </nav>
  );
}
