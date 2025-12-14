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
      {/* Logo - Only visible at top */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
        className="mb-4 pointer-events-auto"
      >
         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-navy font-bold shadow-glow text-xl">
            ZK
        </div>
      </motion.div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            asChild
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all shadow-lg group relative"
          >
            <Link href={item.href}>
              <item.icon className="w-5 h-5" />
              <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          </Button>
        ))}

        {/* Dashboards Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all shadow-lg group relative">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Dashboards
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-900/95 backdrop-blur-xl border-slate-800 text-slate-200 mr-14">
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <Link href="/dashboard">Students/Job Seekers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <Link href="/global-employers-dashboard">Employers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <Link href="/college-dashboard">Colleges</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <Link href="/ngo-dashboard">NGO</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <Link href="/admin-dashboard">Admin</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-px w-8 bg-white/10 mx-auto my-1" />

        {/* Auth Buttons */}
        <Button
            asChild
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all shadow-lg group relative"
        >
            <Link href="/login">
                <LogIn className="w-5 h-5" />
                <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Login
                </span>
            </Link>
        </Button>

        <Button
            asChild
            size="icon"
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group relative"
        >
            <Link href="/signup">
                <UserPlus className="w-5 h-5" />
                <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Get Started
                </span>
            </Link>
        </Button>
      </div>
    </motion.div>
  );
};
