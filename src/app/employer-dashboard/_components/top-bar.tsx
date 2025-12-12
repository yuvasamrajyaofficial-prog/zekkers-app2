'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, Bell } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import MobileEmployerSidebar from './mobile-employer-sidebar';

function Topbar({ dashboardName }: { dashboardName: string }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    router.push('/');
  };

  const profileLink = '/employer-dashboard/settings';

  return (
    <div className="flex h-16 items-center justify-between p-3 border-b bg-white gap-4">
      {/* Left side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] flex flex-col bg-white">
                 <SheetHeader className="p-4 border-b">
                  <SheetTitle>Employer Menu</SheetTitle>
                  <SheetDescription>Manage your hiring platform.</SheetDescription>
                </SheetHeader>
                <MobileEmployerSidebar closeSheet={() => setIsMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>
        </div>
        <SidebarTrigger className="hidden md:block" />
        <div className="hidden md:block font-semibold text-lg">
          {dashboardName}
        </div>
      </div>
      
      {/* Center (Search) - can be added later if needed */}
      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/employer-dashboard/jobs/create">Post a Job</Link>
          </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/employer-dashboard/notifications">
            <Bell size={16} />
          </Link>
        </Button>
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    A
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
