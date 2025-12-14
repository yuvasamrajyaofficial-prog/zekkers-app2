
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, Facebook, Instagram, Youtube, CheckCircle2, Search, Globe as GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MotionFade from '@/components/motion-fade';
import FeaturesSection from '@/app/landing-page-components/features-section';
import HowItWorksSection from '@/app/landing-page-components/how-it-works-section';
import JobsSection from '@/app/landing-page-components/jobs-section';
import TestimonialsSection from '@/app/landing-page-components/testimonials-section';
import FaqSection from '@/app/landing-page-components/faq-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import StarrySky from '@/components/starry-sky';
import { Globe } from '@/components/ui/globe';
import { motion } from 'framer-motion';

export default function ZekkersLanding() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="theme-landing min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarrySky />
      
      {/* NAV */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "p-2" : "p-4"
      )}>
        <div className={cn(
          "w-full max-w-7xl mx-auto py-3 px-6 flex items-center justify-between rounded-xl border transition-all duration-300",
          isScrolled ? "bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-lg" : "bg-transparent border-transparent"
        )}>
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-navy font-bold shadow-glow">
                ZK
            </div>
            <div className="text-xl font-bold font-headline tracking-tight text-white">Zekkers</div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard/jobs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Jobs
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Features
            </a>
            <a href="#how" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                How it works
            </a>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white">
                    Dashboards
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900/95 backdrop-blur-xl border-slate-800 text-slate-200">
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
            </nav>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                    <Button asChild variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-white text-slate-900 hover:bg-slate-200 font-semibold shadow-lg shadow-white/10">
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>
                <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-300 hover:bg-white/5 hover:text-white">
                        <Menu className="h-6 w-6" />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[300px] bg-slate-950 border-slate-800 text-slate-200 p-6 overflow-y-auto">
                        <div className="flex flex-col gap-6 mt-6">
                            <div className="flex flex-col gap-4">
                                <Link href="/dashboard/jobs" className="text-lg font-medium hover:text-primary transition-colors">Jobs</Link>
                                <a href="#features" className="text-lg font-medium hover:text-primary transition-colors">Features</a>
                                <a href="#how" className="text-lg font-medium hover:text-primary transition-colors">How it works</a>
                            </div>
                            
                            <div className="h-px bg-slate-800" />
                            
                            <div className="flex flex-col gap-4">
                                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Dashboards</div>
                                <Link href="/dashboard" className="text-lg font-medium hover:text-primary transition-colors pl-4 border-l-2 border-slate-800 hover:border-primary">Students</Link>
                                <Link href="/global-employers-dashboard" className="text-lg font-medium hover:text-primary transition-colors pl-4 border-l-2 border-slate-800 hover:border-primary">Employers</Link>
                                <Link href="/college-dashboard" className="text-lg font-medium hover:text-primary transition-colors pl-4 border-l-2 border-slate-800 hover:border-primary">Colleges</Link>
                                <Link href="/ngo-dashboard" className="text-lg font-medium hover:text-primary transition-colors pl-4 border-l-2 border-slate-800 hover:border-primary">NGO</Link>
                                <Link href="/admin-dashboard" className="text-lg font-medium hover:text-primary transition-colors pl-4 border-l-2 border-slate-800 hover:border-primary">Admin</Link>
                            </div>

                            <div className="h-px bg-slate-800" />

                            <div className="flex flex-col gap-3">
                                <Button asChild variant="ghost" className="w-full justify-start text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                </div>
            </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-12 pt-20 pb-16 overflow-hidden">
        
        {/* Globe Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full md:w-[1000px] md:h-[1000px] opacity-80 mix-blend-screen">
                <Globe />
            </div>
        </div>

        {/* Floating Elements (Opportunities) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Existing Floating Elements - Kept for "Universe" feel */}
            <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] left-[5%] md:left-[10%] hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl z-20"
            >
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-sm font-semibold text-white">Verified Employer</div>
                    <div className="text-xs text-muted-foreground">Trust Score: 100%</div>
                </div>
            </motion.div>

            <motion.div 
                animate={{ y: [0, 25, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] right-[5%] md:right-[10%] hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl z-20"
            >
                <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    <Search className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-sm font-semibold text-white">AI Job Match</div>
                    <div className="text-xs text-muted-foreground">98% Compatibility</div>
                </div>
            </motion.div>

             <motion.div 
                animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[25%] right-[10%] md:right-[15%] hidden lg:flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-white/5 z-20"
            >
                <div className="p-1.5 rounded-md bg-purple-500/20 text-purple-400">
                    <GlobeIcon className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium text-slate-300">Global Reach</div>
            </motion.div>

            {/* New "Opportunity" Labels simulating globe data - Styled for visibility */}
            <motion.div 
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[25%] left-[15%] md:left-[25%] px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono backdrop-blur-md hidden md:block"
            >
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block mr-2 animate-pulse"/>
                USA: 12,450+ Jobs
            </motion.div>
            <motion.div 
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[35%] right-[15%] md:right-[25%] px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono backdrop-blur-md hidden md:block"
            >
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2 animate-pulse"/>
                Europe: 8,230+ Jobs
            </motion.div>
             <motion.div 
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[45%] right-[10%] md:right-[15%] px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono backdrop-blur-md hidden md:block"
            >
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block mr-2 animate-pulse"/>
                Asia: 15,100+ Jobs
            </motion.div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
            <MotionFade>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Now live in 54+ countries
              </div>
            </MotionFade>

            <MotionFade delay={0.1}>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]">
                <span className="block text-white">Smart Seekers.</span>
                <span className="block bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent pb-2">
                  Verified Futures.
                </span>
              </h1>
            </MotionFade>
            
            <MotionFade delay={0.2}>
              <p className="mt-6 md:mt-8 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                The unified career ecosystem connecting students, professionals, and global employers through AI-driven matching and transparent hiring.
              </p>
            </MotionFade>

            <MotionFade delay={0.3}>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4 md:px-0">
                 <Button asChild size="lg" className="w-full sm:w-auto h-12 md:h-14 px-8 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    <Link href="/dashboard">Find a Job</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-8 text-base rounded-full bg-white/5 text-white border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all hover:scale-105">
                    <Link href="/global-employers-dashboard">Post a Job</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-slate-500">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Free for students</span>
                </div>
              </div>
            </MotionFade>
        </div>
      </section>

      <FeaturesSection />
      
      <JobsSection />

      <HowItWorksSection />
      
      {/* MID-PAGE CTA */}
      <section className="px-6 md:px-12 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30 pointer-events-none" />
        <MotionFade>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Ready to launch your career?
            </h3>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
              Join thousands of others and take the next step in your career with confidence.
            </p>
            <div className="mt-8">
               <Button asChild size="lg" className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity">
                <Link href="/dashboard/jobs">Browse All Jobs</Link>
              </Button>
            </div>
          </div>
        </MotionFade>
      </section>

      <TestimonialsSection />

      <FaqSection />


      {/* CTA */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-card to-background border border-white/10 p-8 md:p-16 text-center md:text-left shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start your journey with Zekkers today.
                </h3>
                <p className="text-lg text-slate-300">
                Whether you're hiring or hunting, we've got the tools you need to succeed in the modern world.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button asChild size="lg" className="h-14 px-8 rounded-full bg-white text-slate-900 hover:bg-slate-200 font-bold shadow-lg">
                    <Link href="/signup">
                        Get Started
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full bg-transparent text-white border-white/20 hover:bg-white/10">
                <Link href="/global-employers-dashboard">Post a Job</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-16 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-navy font-bold">
                  ZK
                </div>
                <div className="font-bold text-xl text-white">Zekkers</div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                A unified career ecosystem connecting students, professionals, employers, colleges, NGOs, and institutions with government, private, and global opportunities.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110" aria-label="Zekkers on X">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110" aria-label="Zekkers on Facebook"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110" aria-label="Zekkers on Instagram"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:scale-110" aria-label="Zekkers on Youtube"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            <div>
              <h4 className="font-bold text-white mb-6">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/dashboard" className="text-slate-400 hover:text-primary transition-colors">For Students</Link></li>
                <li><Link href="/global-employers-dashboard" className="text-slate-400 hover:text-primary transition-colors">For Employers</Link></li>
                <li><Link href="/college-dashboard" className="text-slate-400 hover:text-primary transition-colors">For Colleges</Link></li>
                <li><Link href="/ngo-dashboard" className="text-slate-400 hover:text-primary transition-colors">For NGOs</Link></li>
                <li><Link href="/dashboard/jobs" className="text-slate-400 hover:text-primary transition-colors">Jobs</Link></li>
                <li><Link href="/dashboard/competitions" className="text-slate-400 hover:text-primary transition-colors">Competitions</Link></li>
                <li><Link href="/dashboard/roadmap" className="text-slate-400 hover:text-primary transition-colors">AI Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="text-slate-400 hover:text-primary transition-colors">Blog & Insights</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors">Contact & Support</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-primary transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/help-center" className="text-slate-400 hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/api-and-integrations" className="text-slate-400 hover:text-primary transition-colors">API & Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/data-protection" className="text-slate-400 hover:text-primary transition-colors">Data Protection</Link></li>
                <li><Link href="/cookie-preferences" className="text-slate-400 hover:text-primary transition-colors">Cookie Preferences</Link></li>
                <li><Link href="/report-abuse" className="text-slate-400 hover:text-primary transition-colors">Report Abuse</Link></li>
                <li><Link href="/accessibility" className="text-slate-400 hover:text-primary transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-slate-600">
          © 2025 Zekkers — Powered by MCT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
