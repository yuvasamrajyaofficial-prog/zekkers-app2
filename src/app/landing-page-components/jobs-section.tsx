'use client';
import React from 'react';
import Link from 'next/link';
import MotionFade from '@/components/motion-fade';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Clock, ArrowRight, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const featuredJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Global',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    salary: '$120k - $160k',
    tags: ['React', 'Next.js', 'TypeScript'],
    logo: 'TC',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'London, UK',
    type: 'Hybrid',
    salary: '£60k - £80k',
    tags: ['Figma', 'UI/UX', 'Motion'],
    logo: 'CS',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'DataFlow Systems',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹25L - ₹40L',
    tags: ['Python', 'ML', 'TensorFlow'],
    logo: 'DF',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'Growth Inc.',
    location: 'New York, USA',
    type: 'On-site',
    salary: '$90k - $110k',
    tags: ['Growth', 'SEO', 'Content'],
    logo: 'GI',
    color: 'bg-orange-500',
  },
];

export default function JobsSection() {
  return (
    <section className="px-6 md:px-12 py-24 bg-background relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <MotionFade>
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Opportunities</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                Explore top roles from verified employers across the globe.
                </p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex border-white/10 text-white hover:bg-white/5">
                <Link href="/dashboard/jobs" className="flex items-center gap-2">
                    View All Jobs <ArrowRight className="w-4 h-4" />
                </Link>
            </Button>
          </div>
        </MotionFade>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
            {featuredJobs.map((job, index) => (
                <MotionFade key={job.id} delay={index * 0.1}>
                    <div className="min-w-[280px] md:min-w-0 h-full snap-center">
                        <div className="group relative h-full p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg",
                                    job.color
                                )}>
                                    {job.logo}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                                    {job.type}
                                </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                {job.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">{job.company}</p>
                            
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    {job.salary}
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {job.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </MotionFade>
            ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
             <Button asChild variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                <Link href="/dashboard/jobs" className="flex items-center justify-center gap-2">
                    View All Jobs <ArrowRight className="w-4 h-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
