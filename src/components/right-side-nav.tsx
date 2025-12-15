"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Layers, 
  Zap, 
  LayoutDashboard, 
  LogIn, 
  UserPlus,
  Menu
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const RightSideNav = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Map scroll to vertical position (0% to 85% of viewport height)
  // We use a spring for smooth movement
  const yRange = useTransform(scrollY, [0, 400], ["2rem", "calc(100vh - 28rem)"]);
  const y = useSpring(yRange, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
    { label: 'Features', href: '#features', icon: Layers },
    { label: 'How it works', href: '#how', icon: Zap },
  ];

  return (
    <motion.div 
      style={{ top: y }}
      className="fixed right-6 z-50 hidden md:flex flex-col gap-3 items-end pointer-events-none"
    >
      {/* Navigation Items */}
      <div className="flex flex-col gap-4 pointer-events-auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            asChild
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-primary/20 group relative"
          >
            <Link href={item.href}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <item.icon className="w-6 h-6 relative z-10" />
              <span className="absolute right-16 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl pointer-events-none">
                {item.label}
              </span>
            </Link>
          </Button>
        ))}

        {/* Dashboards Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-primary/20 group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    <LayoutDashboard className="w-6 h-6 relative z-10" />
                    <span className="absolute right-16 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl pointer-events-none">
                        Dashboards
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={20} className="w-64 bg-slate-900/90 backdrop-blur-2xl border-white/10 text-slate-200 p-2 rounded-2xl shadow-2xl mr-4 animate-in fade-in zoom-in-95 slide-in-from-right-5">
                <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Select Dashboard
                </div>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/20 focus:text-primary cursor-pointer py-3 px-3">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <UserPlus className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-white">Student</span>
                            <span className="text-xs text-slate-400">Find jobs & internships</span>
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-accent/20 focus:text-accent cursor-pointer py-3 px-3">
                    <Link href="/global-employers-dashboard" className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-accent/10 text-accent">
                            <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-white">Recruiter</span>
                            <span className="text-xs text-slate-400">Hire top talent</span>
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-purple-500/20 focus:text-purple-400 cursor-pointer py-3 px-3">
                    <Link href="/college-dashboard" className="flex items-center gap-3">
                         <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                            <Layers className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-white">College</span>
                            <span className="text-xs text-slate-400">Manage placements</span>
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-orange-500/20 focus:text-orange-400 cursor-pointer py-3 px-3">
                    <Link href="/ngo-dashboard" className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                            <Zap className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-white">NGO</span>
                            <span className="text-xs text-slate-400">Social impact</span>
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10 my-2" />
                <DropdownMenuItem asChild className="rounded-xl focus:bg-red-500/20 focus:text-red-400 cursor-pointer py-3 px-3">
                    <Link href="/admin-dashboard" className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                            <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-white">Admin</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-px w-8 bg-white/10 mx-auto my-2" />

        {/* Auth Buttons */}
        <Button
            asChild
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg group relative"
        >
            <Link href="/login">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <LogIn className="w-6 h-6 relative z-10" />
                <span className="absolute right-16 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl pointer-events-none">
                    Login
                </span>
            </Link>
        </Button>

        <Button
            asChild
            size="icon"
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group relative"
        >
            <Link href="/signup">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <UserPlus className="w-6 h-6 relative z-10" />
                <span className="absolute right-16 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl pointer-events-none">
                    Get Started
                </span>
            </Link>
        </Button>
      </div>
    </motion.div>
  );
};
