
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
import { ChevronDown, Menu, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MotionFade from '@/components/motion-fade';
import FeaturesSection from '@/app/landing-page-components/features-section';
import HowItWorksSection from '@/app/landing-page-components/how-it-works-section';
import JobsSection from '@/app/landing-page-components/jobs-section';
import TestimonialsSection from '@/app/landing-page-components/testimonials-section';
import FaqSection from '@/app/landing-page-components/faq-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import StarrySky from '@/components/starry-sky';


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
    <div className="min-h-screen bg-background text-foreground">
      <StarrySky />
      {/* NAV */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "p-2" : "p-4"
      )}>
        <div className={cn(
          "w-full max-w-4xl mx-auto py-2 px-6 flex items-center justify-between rounded-md border transition-all duration-300",
          isScrolled ? "bg-slate-800/50 backdrop-blur-md border-slate-700" : "bg-transparent border-slate-700"
        )}>
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-navy font-bold">
                ZK
            </div>
            <div className="text-lg font-semibold font-headline text-white">Zekkers</div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard/jobs" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
                Jobs
            </Link>
            <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
                Features
            </a>
            <a href="#how" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">
                How it works
            </a>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white">
                    Dashboards
                    <ChevronDown className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Students/Job Seekers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/employer-dashboard">Employers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/college-dashboard">Colleges</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/ngo-dashboard">NGO</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/global-employers-dashboard">Global Employers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin-dashboard">Admin</Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </nav>

            <div className="flex items-center gap-2">
                <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild><Link href="/dashboard/jobs">Jobs</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><a href="#features">Features</a></DropdownMenuItem>
                    <DropdownMenuItem asChild><a href="#how">How it works</a></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Dashboards</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                        <DropdownMenuItem asChild><Link href="/dashboard">Students/Job Seekers</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/employer-dashboard">Employers</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/college-dashboard">Colleges</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/ngo-dashboard">NGO</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/global-employers-dashboard">Global Employers</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard">Admin</Link>
                        </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-7xl mx-auto text-center">
            <MotionFade>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
                Zekkers — Smart Seekers. Verified Opportunities. AI-Powered Futures.
              </h1>
            </MotionFade>
            
            <MotionFade delay={0.08}>
              <h2 className="mt-4 text-lg font-semibold text-slate-400">
                Government. Private. Global. Remote. Campus Hiring — all in one trusted ecosystem.
              </h2>
            </MotionFade>

            <MotionFade delay={0.12}>
              <p className="mt-5 text-muted-foreground max-w-3xl mx-auto">
                Zekkers connects ambitious seekers with verified employers through AI-driven matching, secure profiles, and transparent hiring. Discover your next opportunity intelligently, confidently, and without limits.
              </p>
            </MotionFade>

            <MotionFade delay={0.2}>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                 <Button asChild size="lg">
                    <Link href="/dashboard">For Students/Seekers</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-slate-700 hover:bg-slate-800 hover:text-white">
                    <Link href="/employer-dashboard">For Employers</Link>
                </Button>
              </div>
            </MotionFade>
        </div>
      </section>

      <FeaturesSection />
      
      <JobsSection />

      <HowItWorksSection />
      
      {/* MID-PAGE CTA */}
      <section className="px-6 md:px-12 py-12">
        <MotionFade>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
              Find Your Next Opportunity Today
            </h3>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              Join thousands of others and take the next step in your career with confidence.
            </p>
            <div className="mt-6">
               <Button asChild size="lg">
                <Link href="/dashboard/jobs">Browse All Jobs</Link>
              </Button>
            </div>
          </div>
        </MotionFade>
      </section>

      <TestimonialsSection />

      <FaqSection />


      {/* CTA */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-navy">
              Ready to start your career journey?
            </h3>
            <p className="mt-2 text-slate-800/80">
              Browse jobs and see what opportunities await.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <Button asChild size="lg" className="bg-white text-primary transition-transform hover:bg-primary hover:text-primary-foreground hover:-translate-y-1">
                <Link href="/signup">
                    Get Started
                </Link>
             </Button>
            <Button asChild size="lg" variant="outline" className="text-primary border-white/50 bg-transparent hover:bg-white transition-colors">
              <Link href="/employer-dashboard">Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-16 bg-card text-foreground border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-navy font-bold">
                  ZK
                </div>
                <div className="font-semibold text-lg text-slate-50">Zekkers</div>
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                A unified career ecosystem connecting students, professionals, employers, colleges, NGOs, and institutions with government, private, and global opportunities. Powered by AI matching, verified employers, and transparent hiring workflows.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary" aria-label="Zekkers on X">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary" aria-label="Zekkers on Facebook"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary" aria-label="Zekkers on Instagram"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-primary" aria-label="Zekkers on Youtube"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-slate-50">Product</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-slate-400 hover:text-primary">For Students</Link></li>
                <li><Link href="/employer-dashboard" className="text-slate-400 hover:text-primary">For Employers</Link></li>
                <li><Link href="/college-dashboard" className="text-slate-400 hover:text-primary">For Colleges</Link></li>
                <li><Link href="/ngo-dashboard" className="text-slate-400 hover:text-primary">For NGOs</Link></li>
                <li><Link href="/global-employers-dashboard" className="text-slate-400 hover:text-primary">For Global Employers</Link></li>
                <li><Link href="/dashboard/jobs" className="text-slate-400 hover:text-primary">Jobs</Link></li>
                <li><Link href="/dashboard/competitions" className="text-slate-400 hover:text-primary">Competitions</Link></li>
                <li><Link href="/dashboard/roadmap" className="text-slate-400 hover:text-primary">AI Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-50">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-primary">About Us</Link></li>
                <li><Link href="/blog" className="text-slate-400 hover:text-primary">Blog & Insights</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-primary">Contact & Support</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-primary">Terms & Conditions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-50">Resources</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/help-center" className="text-slate-400 hover:text-primary">Help Center</Link></li>
                <li><Link href="/api-and-integrations" className="text-slate-400 hover:text-primary">API & Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-50">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/data-protection" className="text-slate-400 hover:text-primary">Data Protection</Link></li>
                <li><Link href="/cookie-preferences" className="text-slate-400 hover:text-primary">Cookie Preferences</Link></li>
                <li><Link href="/report-abuse" className="text-slate-400 hover:text-primary">Report Abuse</Link></li>
                <li><Link href="/accessibility" className="text-slate-400 hover:text-primary">Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-slate-500">
          © 2025 Zekkers — Powered by MCT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
