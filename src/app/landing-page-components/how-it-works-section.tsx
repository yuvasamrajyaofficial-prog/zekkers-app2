'use client';
import React, { useState } from 'react';
import MotionFade from '@/components/motion-fade';
import { User, Building2, Search, FileText, Send, CheckCircle2, Briefcase, Users, MessageSquare, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const seekerSteps = [
  {
    title: 'Create Your Profile',
    description: 'Sign up and build your comprehensive profile. Our AI analyzes your skills, education, and experience to create a verified digital identity.',
    icon: <User className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    title: 'Get Matched',
    description: 'Receive personalized job recommendations with match scores. See exactly why a job is a good fit for you based on your unique profile.',
    icon: <Search className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    title: 'One-Click Apply',
    description: 'Apply to verified jobs instantly. We pre-fill your application and attach your best resume, saving you time and effort.',
    icon: <Send className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    title: 'Get Hired',
    description: 'Track your applications, schedule interviews, and accept offers—all within the Zekkers platform.',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "bg-yellow-500",
  },
];

const employerSteps = [
  {
    title: 'Post a Job',
    description: 'Create detailed job listings with AI assistance. Specify requirements, skills, and screening questions to attract the right talent.',
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-orange-500",
  },
  {
    title: 'AI Screening',
    description: 'Our AI automatically screens and ranks applicants based on your criteria, highlighting the top candidates for your review.',
    icon: <Users className="w-6 h-6" />,
    color: "bg-red-500",
  },
  {
    title: 'Connect & Interview',
    description: 'Message candidates, schedule interviews, and manage the entire hiring process seamlessly from your dashboard.',
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-pink-500",
  },
  {
    title: 'Hire with Confidence',
    description: 'Make offers and onboard your new team members. Zekkers ensures a smooth transition from applicant to employee.',
    icon: <Award className="w-6 h-6" />,
    color: "bg-cyan-500",
  },
];

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'seeker' | 'employer'>('seeker');
  const steps = activeTab === 'seeker' ? seekerSteps : employerSteps;

  return (
    <section id="how" className="px-6 md:px-12 py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <MotionFade>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How Zekkers Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Simple, transparent, and effective. Whether you're hiring or hunting, we've streamlined the process.
            </p>
            
            <div className="inline-flex p-1 rounded-full bg-slate-900 border border-white/10">
                <button
                    onClick={() => setActiveTab('seeker')}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                        activeTab === 'seeker' 
                            ? "bg-white text-slate-900 shadow-lg" 
                            : "text-slate-400 hover:text-white"
                    )}
                >
                    For Job Seekers
                </button>
                <button
                    onClick={() => setActiveTab('employer')}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                        activeTab === 'employer' 
                            ? "bg-white text-slate-900 shadow-lg" 
                            : "text-slate-400 hover:text-white"
                    )}
                >
                    For Employers
                </button>
            </div>
          </div>
        </MotionFade>

        <div className="relative">
            {/* Central Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 md:-translate-x-1/2">
                <motion.div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </div>

            <div className="space-y-12">
                {steps.map((step, index) => (
                    <motion.div 
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={cn(
                            "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center",
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                        )}
                    >
                        {/* Content Side */}
                        <div className="flex-1 pl-20 md:pl-0 md:px-12 w-full">
                            <div className={cn(
                                "p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors",
                                index % 2 === 0 ? "md:text-left" : "md:text-right"
                            )}>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>

                        {/* Icon Node */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                            <div className={cn(
                                "w-16 h-16 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-xl z-10",
                                step.color
                            )}>
                                <div className="text-white">
                                    {step.icon}
                                </div>
                            </div>
                        </div>

                        {/* Empty Side for Balance */}
                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
