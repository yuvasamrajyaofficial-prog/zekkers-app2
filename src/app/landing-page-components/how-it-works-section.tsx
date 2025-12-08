
'use client';
import React from 'react';
import MotionFade from '@/components/motion-fade';
import { UserPlus, Briefcase, FileCheck2, Check } from 'lucide-react';

const howItWorksSeeker = {
  title: 'For Job Seekers',
  icon: <UserPlus className="w-6 h-6" />,
  description: 'Your smart path from profile to placement.',
  steps: [
    {
      title: 'Build Your Profile',
      points: [
        'Create your profile and upload documents.',
        'AI analyzes your skills and career goals.',
        'Get a personalized strength score.',
      ],
    },
    {
      title: 'Discover Opportunities',
      points: [
        'Receive AI-matched jobs (Govt, Private, Global).',
        'Filter by salary, skills, location, and more.',
        'Get an AI roadmap to fill skill gaps.',
      ],
    },
    {
      title: 'Apply & Grow',
      points: [
        'Apply with one click.',
        'Track all applications in your dashboard.',
        'Use AI tools to prep for interviews.',
      ],
    },
  ],
  outcome: 'A faster, safer, more intelligent pathway to your next job.',
};

const howItWorksEmployer = {
  title: 'For Employers',
  icon: <Briefcase className="w-6 h-6" />,
  description: 'A streamlined flow from verification to hiring.',
  steps: [
    {
      title: 'Verify Your Company',
      points: [
        'Complete KYC to earn a Verified Badge.',
        'Enhance your Company Trust Score.',
        'Set up your hiring team and permissions.',
      ],
    },
    {
      title: 'Post & Source Talent',
      points: [
        'Post jobs for local or global audiences.',
        'Use AI to optimize job descriptions.',
        'Source candidates from our verified talent pool.',
      ],
    },
    {
      title: 'Hire Efficiently',
      points: [
        'Receive AI-ranked and vetted applicants.',
        'Manage candidates in a simple ATS pipeline.',
        'Schedule interviews, send offers, and analyze results.',
      ],
    },
  ],
  outcome: 'A transparent, high-quality hiring process that saves time and finds the right talent.',
};

const HowItWorksCard = ({ path }: { path: typeof howItWorksSeeker }) => (
    <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-lg hover:shadow-cyan-500/10 transition-shadow h-full flex flex-col">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">{path.icon}</div>
        <h3 className="font-semibold text-lg text-foreground">{path.title}</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{path.description}</p>

      <div className="mt-4 space-y-4 relative flex-1">
        <div className="absolute left-[1.125rem] top-4 bottom-4 w-0.5 bg-border/50 -z-10"></div>
        {path.steps.map((step, i) => (
          <div key={step.title} className="relative z-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm border-4 border-card">
                {i + 1}
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-foreground">{step.title}</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {step.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-green-500/10 text-green-300 flex items-center gap-3">
        <FileCheck2 className="w-5 h-5 shrink-0" />
        <p className="font-semibold text-sm">{path.outcome}</p>
      </div>
    </div>
  );

export default function HowItWorksSection() {
    return (
        <section id="how" className="px-6 md:px-12 py-16">
            <div className="max-w-7xl mx-auto">
                <MotionFade>
                    <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">⭐ How It Works</h2>
                    <p className="mt-3 text-muted-foreground">
                        Simple, fast, and intelligent for everyone.
                    </p>
                    </div>
                </MotionFade>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <MotionFade delay={0.1}>
                    <HowItWorksCard path={howItWorksSeeker} />
                    </MotionFade>
                    <MotionFade delay={0.2}>
                    <HowItWorksCard path={howItWorksEmployer} />
                    </MotionFade>
                </div>
            </div>
      </section>
    );
}
