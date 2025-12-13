'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Bell, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';

function Topbar({ dashboardName }: { dashboardName: string }) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const profileLink = '/employer-dashboard/settings';

  return (
    <div className="flex h-16 items-center justify-between px-4 border-b bg-white gap-4 sticky top-0 z-10">
      {/* Left side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <SidebarTrigger />
        <div className="font-semibold text-lg hidden md:block">
          {dashboardName}
        </div>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <Link href="/employer-dashboard/jobs/create">Post a Job</Link>
          </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/employer-dashboard/notifications">
            <Bell size={18} />
          </Link>
        </Button>
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={profileLink}>My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  );
}

export default Topbar;
