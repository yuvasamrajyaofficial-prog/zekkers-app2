

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
  User,
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
} from 'lucide-react';
import {
  Sidebar,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
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

export default function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

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
    <Sidebar className="flex flex-col bg-white border-r border-slate-200">
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
          ZK
        </div>
        {(sidebarState === 'expanded') && (
          <div className="overflow-hidden">
            <div className="font-semibold">Zekkers</div>
            <div className="text-xs text-slate-500 truncate">
              Welcome
            </div>
          </div>
        )}
      </div>

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
                  {sidebarState === 'expanded' && <div className="text-sm">{item.label}</div>}
                </div>
                {sidebarState === 'expanded' && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />}
              </CollapsibleTrigger>
              <CollapsibleContent className={cn("pl-6", sidebarState === 'collapsed' && 'hidden')}>
                <div className="flex flex-col gap-1 mt-1 border-l-2 border-slate-200 pl-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.key}
                      href={subItem.to}
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
              {sidebarState === 'expanded' && <div className="text-sm">{item.label}</div>}
            </Link>
          )
        )}
      </nav>
    </Sidebar>
  );
}
