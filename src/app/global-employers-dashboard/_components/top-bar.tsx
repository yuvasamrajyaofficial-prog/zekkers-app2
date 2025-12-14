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

function Topbar({ dashboardName }: { dashboardName: string }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <SidebarTrigger className="md:hidden" />
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
