'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  ShieldAlert,
  LogOut,
  UserCheck,
  Building2,
  FileText,
  BrainCircuit,
  Shield,
  BarChart3,
  CreditCard,
  Bell,
  LifeBuoy,
  Flag,
  Activity,
  Terminal,
  FileUser
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuGroups = [
    {
      label: 'Overview',
      items: [
        { title: 'Dashboard', url: '/admin-dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'User Management',
      items: [
        { title: 'Users', url: '/admin-dashboard/users', icon: Users },
        { title: 'Verification', url: '/admin-dashboard/verification', icon: UserCheck },
        { title: 'Tenants', url: '/admin-dashboard/tenants', icon: Building2 },
      ]
    },
    {
      label: 'Content & Jobs',
      items: [
        { title: 'Job Moderation', url: '/admin-dashboard/jobs', icon: Briefcase },
        { title: 'Applicants', url: '/admin-dashboard/applicants', icon: FileUser },
        { title: 'Quizzes', url: '/admin-dashboard/quizzes', icon: BrainCircuit },
        { title: 'Moderation', url: '/admin-dashboard/moderation', icon: Shield },
      ]
    },
    {
      label: 'Platform Ops',
      items: [
        { title: 'Analytics', url: '/admin-dashboard/analytics', icon: BarChart3 },
        { title: 'Billing', url: '/admin-dashboard/billing', icon: CreditCard },
        { title: 'Notifications', url: '/admin-dashboard/notifications', icon: Bell },
        { title: 'Support', url: '/admin-dashboard/support', icon: LifeBuoy },
      ]
    },
    {
      label: 'System',
      items: [
        { title: 'Feature Flags', url: '/admin-dashboard/feature-flags', icon: Flag },
        { title: 'Health', url: '/admin-dashboard/health', icon: Activity },
        { title: 'Functions', url: '/admin-dashboard/functions', icon: Terminal },
        { title: 'Settings', url: '/admin-dashboard/settings', icon: Settings },
      ]
    }
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center px-4">
        <div className="flex items-center gap-2 font-bold text-sidebar-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldAlert className="size-4" />
          </div>
          <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground transition-colors"
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
                onClick={logout}
                className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
