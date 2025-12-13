
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Settings,
  PlusCircle,
  Search,
  LogOut,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export default function EmployerSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/employer-dashboard',
      exact: true,
    },
    {
      label: 'Jobs',
      icon: Briefcase,
      href: '/employer-dashboard/jobs',
      subItems: [
        { label: 'Manage Jobs', href: '/employer-dashboard/jobs', icon: Briefcase },
        { label: 'Post a Job', href: '/employer-dashboard/jobs/create', icon: PlusCircle },
      ]
    },
    {
      label: 'Candidates',
      icon: Users,
      href: '/employer-dashboard/candidates',
      subItems: [
        { label: 'All Applicants', href: '/employer-dashboard/candidates', icon: Users },
        { label: 'AI Finder', href: '/employer-dashboard/candidates/ai-finder', icon: Search },
      ]
    },
    {
      label: 'Company',
      icon: Building2,
      href: '/employer-dashboard/company',
      subItems: [
        { label: 'Profile', href: '/employer-dashboard/company/profile', icon: Building2 },
        { label: 'Branding', href: '/employer-dashboard/branding', icon: ShieldCheck },
      ]
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/employer-dashboard/settings',
    },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">ZekkTech</span>
            <span className="truncate text-xs text-muted-foreground">Employer Panel</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  {item.subItems ? (
                    <div className="space-y-1">
                       <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.href)}
                        tooltip={item.label}
                        className="font-medium"
                       >
                          <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                          </Link>
                       </SidebarMenuButton>
                       {/* Simple sub-menu rendering for now, can be collapsible if needed */}
                       <div className="pl-4 space-y-1 group-data-[collapsible=icon]:hidden">
                          {item.subItems.map(sub => (
                              <SidebarMenuButton 
                                key={sub.href} 
                                asChild 
                                isActive={isActive(sub.href, true)}
                                size="sm"
                              >
                                  <Link href={sub.href}>
                                      <span>{sub.label}</span>
                                  </Link>
                              </SidebarMenuButton>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.href, item.exact)}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Support">
                            <Link href="/employer-dashboard/support">
                                <HelpCircle />
                                <span>Support</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
