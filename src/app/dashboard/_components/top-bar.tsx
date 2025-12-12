'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { LogOut, Menu, Search, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
import MobileAppSidebar from './mobile-app-sidebar';

export default function Topbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between p-3 border-b bg-white gap-4">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px] flex flex-col bg-white">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>Zekkers Menu</SheetTitle>
                        <SheetDescription>Navigate through your student dashboard.</SheetDescription>
                    </SheetHeader>
                    <MobileAppSidebar closeSheet={() => setIsMobileMenuOpen(false)} />
                </SheetContent>
            </Sheet>
        </div>
        <SidebarTrigger className="hidden md:block" />
        <div className="hidden md:block font-semibold text-lg">
          Welcome back!
        </div>
      </div>

      {/* Center (Search) */}
      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search jobs, skills..."
            className="rounded-full border px-4 py-2 w-full text-sm pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/messages">
            <Bell size={16} />
          </Link>
        </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  );
}
