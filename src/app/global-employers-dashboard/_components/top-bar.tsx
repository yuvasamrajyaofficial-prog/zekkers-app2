'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Menu,
  Bell,
  Briefcase,
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MobileGlobalSidebar from './mobile-global-sidebar';

function Topbar({ dashboardName }: { dashboardName: string }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
               <SheetHeader className="p-4 border-b">
                <SheetTitle>Global Employer Menu</SheetTitle>
                <SheetDescription>Manage your global hiring.</SheetDescription>
              </SheetHeader>
              <MobileGlobalSidebar closeSheet={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <SidebarTrigger className="hidden md:block" />
        <div className="hidden md:block font-semibold text-lg">
          {dashboardName}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Button asChild>
          <Link href="/global-employers-dashboard/jobs/create" className="gap-2">
            <Briefcase size={16} />
            <span className="hidden sm:inline">Post Job</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
            <Link href="#">
                <Bell size={16} />
            </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
