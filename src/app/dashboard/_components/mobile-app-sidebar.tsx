
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

interface MobileAppSidebarProps {
  closeSheet: () => void;
}

export default function MobileAppSidebar({ closeSheet }: MobileAppSidebarProps) {
  const pathname = usePathname();

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
              className={`group flex items-center justify-between w-full gap-3 p-2 rounded-md hover:bg-yellow-400 hover:text-gray-900 ${
                isItemActive(item) ? 'bg-yellow-500 text-gray-900' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`text-orange-700 group-hover:text-gray-900 ${
                    isItemActive(item) ? 'text-gray-900' : ''
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-sm font-semibold">{item.label}</div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6">
              <div className="flex flex-col gap-1 mt-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.key}
                    href={subItem.to}
                    onClick={closeSheet}
                    className={`group flex items-center gap-3 p-2 rounded-md text-sm ${
                      pathname === subItem.to
                        ? 'bg-orange-100'
                        : 'hover:bg-orange-50'
                    }`}
                  >
                    <div
                      className={`text-white group-hover:text-gray-900 ${
                        pathname === subItem.to ? 'text-gray-900' : ''
                      }`}
                    >
                      {subItem.icon}
                    </div>
                    <div className="text-xs font-semibold">
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
              isItemActive(item) ? 'bg-orange-100' : 'hover:bg-orange-50'
            }`}
          >
            <div
              className={`text-orange-700 group-hover:text-gray-900 ${
                isItemActive(item) ? 'text-gray-900' : ''
              }`}
            >
              {item.icon}
            </div>
            <div className="text-sm font-semibold">{item.label}</div>
          </Link>
        )
      )}
    </nav>
  );
}
