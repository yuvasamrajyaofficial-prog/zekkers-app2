
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  Bell,
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MobileAdminSidebar from './mobile-admin-sidebar';

function Topbar({ dashboardName }: { dashboardName: string }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5"/>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
               <SheetHeader className="p-4 border-b">
                <SheetTitle>Admin Menu</SheetTitle>
                <SheetDescription>Platform Control</SheetDescription>
              </SheetHeader>
              <MobileAdminSidebar closeSheet={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <SidebarTrigger className="hidden md:block" />
        <div className="hidden md:block font-semibold text-lg">
          {dashboardName}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin-dashboard/notifications">
            <Bell size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
