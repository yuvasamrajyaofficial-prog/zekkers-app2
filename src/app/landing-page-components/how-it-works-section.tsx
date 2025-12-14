'use client';
import React, { useState, useRef } from 'react';
import MotionFade from '@/components/motion-fade';
import { User, Building2, Search, FileText, Send, CheckCircle2, Briefcase, Users, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const seekerSteps = [
  {
    title: 'Create Your Profile',
    description: 'Sign up and build your comprehensive profile. Our AI analyzes your skills, education, and experience to create a verified digital identity.',
    icon: <User className="w-6 h-6" />,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/50",
  },
  {
    title: 'Get Matched',
    description: 'Receive personalized job recommendations with match scores. See exactly why a job is a good fit for you based on your unique profile.',
    icon: <Search className="w-6 h-6" />,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/50",
  },
  {
    title: 'One-Click Apply',
    description: 'Apply to verified jobs instantly. We pre-fill your application and attach your best resume, saving you time and effort.',
    icon: <Send className="w-6 h-6" />,
    color: "bg-green-500",
    shadow: "shadow-green-500/50",
  },
  {
    title: 'Get Hired',
    description: 'Track your applications, schedule interviews, and accept offers—all within the Zekkers platform.',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "bg-yellow-500",
    shadow: "shadow-yellow-500/50",
  },
];

const employerSteps = [
  {
    title: 'Post a Job',
    description: 'Create detailed job listings with AI assistance. Specify requirements, skills, and screening questions to attract the right talent.',
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/50",
  },
  {
    title: 'AI Screening',
    description: 'Our AI automatically screens and ranks applicants based on your criteria, highlighting the top candidates for your review.',
    icon: <Users className="w-6 h-6" />,
    color: "bg-red-500",
    shadow: "shadow-red-500/50",
  },
  {
    title: 'Connect & Interview',
    description: 'Message candidates, schedule interviews, and manage the entire hiring process seamlessly from your dashboard.',
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-pink-500",
    shadow: "shadow-pink-500/50",
  },
  {
    title: 'Hire with Confidence',
    description: 'Make offers and onboard your new team members. Zekkers ensures a smooth transition from applicant to employee.',
    icon: <Award className="w-6 h-6" />,
    color: "bg-cyan-500",
    shadow: "shadow-cyan-500/50",
  },
];

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'seeker' | 'employer'>('seeker');
  const steps = activeTab === 'seeker' ? seekerSteps : employerSteps;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section id="how" className="px-6 md:px-12 py-24 bg-background relative overflow-hidden" ref={containerRef}>
        {/* Background Elements */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <MotionFade>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How Zekkers Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Simple, transparent, and effective. Whether you're hiring or hunting, we've streamlined the process.
            </p>
            
            <div className="inline-flex p-1.5 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-sm relative">
                {/* Animated Background Pill */}
                <motion.div 
                    className="absolute top-1.5 bottom-1.5 rounded-full bg-primary shadow-lg shadow-primary/25 z-0"
                    initial={false}
                    animate={{
                        left: activeTab === 'seeker' ? '6px' : '50%',
                        width: 'calc(50% - 9px)',
                        x: activeTab === 'employer' ? 3 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button
                    onClick={() => setActiveTab('seeker')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200",
                        activeTab === 'seeker' ? "text-white" : "text-slate-400 hover:text-white"
                    )}
                >
                    For Job Seekers
                </button>
                <button
                    onClick={() => setActiveTab('employer')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200",
                        activeTab === 'employer' ? "text-white" : "text-slate-400 hover:text-white"
                    )}
                >
                    For Employers
                </button>
            </div>
          </div>
        </MotionFade>

        <div className="relative mt-16 md:mt-24">
            {/* Central Line - Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
                <motion.div 
                    className="w-full bg-gradient-to-b from-primary via-purple-500 to-accent"
                    style={{ height: lineHeight }}
                />
            </div>

            {/* Mobile Timeline Line */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800 rounded-full overflow-hidden">
                 <motion.div 
                    className="w-full bg-gradient-to-b from-primary via-purple-500 to-accent"
                    style={{ height: lineHeight }}
                />
            </div>

            <div className="space-y-8 md:space-y-12">
                <AnimatePresence mode='wait'>
                    {steps.map((step, index) => (
                        <motion.div 
                            key={`${activeTab}-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col md:flex-row gap-6 md:gap-0 items-center",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}
                        >
                            {/* Content Side */}
                            <div className="flex-1 w-full pl-16 md:pl-0 md:px-16">
                                <motion.div 
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={cn(
                                        "relative p-5 md:p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/20 transition-all duration-300 group shadow-lg overflow-hidden max-w-md",
                                        index % 2 === 0 ? "mr-auto text-left" : "ml-auto text-right"
                                    )}
                                >
                                    {/* Hover Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                                    <div className={cn(
                                        "inline-flex md:hidden items-center justify-center w-8 h-8 rounded-lg mb-3 text-white font-bold text-sm",
                                        step.color, step.shadow
                                    )}>
                                        {index + 1}
                                    </div>
                                    
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Icon Node */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 + (index * 0.1) }}
                                    className={cn(
                                        "w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-background flex items-center justify-center shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] z-10 relative",
                                        step.color
                                    )}
                                >
                                    <div className="text-white relative z-10 transform scale-75 md:scale-100">
                                        {step.icon}
                                    </div>
                                    {/* Pulse Effect */}
                                    <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", step.color)} />
                                </motion.div>
                            </div>

                            {/* Empty Side for Balance */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
}
// Layout optimized for mobile and desktop
