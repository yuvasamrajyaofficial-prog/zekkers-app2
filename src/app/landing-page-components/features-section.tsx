
'use client';
import React from 'react';
import MotionFade from '@/components/motion-fade';
import { Search, ShieldCheck, Globe, School, Zap, Bell, GitBranch, Check } from 'lucide-react';
import { RoadmapVisual } from './roadmap-visual';

const newFeatures = [
  {
    icon: <Search className="w-6 h-6" />,
    title: 'AI Job Matching',
    description: 'Our AI delivers explainable, personalized job recommendations that match your complete profile, skills, and career goals—not just keywords.',
    points: [
      'Personalized match scores with clear reasoning',
      'Highlights skill gaps and suggests improvements',
      'Adapts in real-time to your activity',
      'Generates automated skill roadmaps',
    ],
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Verified Employers',
    description: 'Every employer undergoes multi-layer KYC verification, including document checks and activity audits, to ensure a safe and trustworthy hiring ecosystem.',
    points: [
      'Company Verification Badge & Trust Score',
      'AI-powered fraud and spam detection',
      'Manual review of job posts for quality',
      'Secure and transparent communication channels',
    ],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Govt + Private + Global',
    description: 'Access government vacancies, private sector roles, and international opportunities all in one unified, easy-to-use platform.',
    points: [
      'Verified government job announcements',
      'Domestic private sector jobs',
      'Global hiring across 54+ countries',
      'Remote, hybrid, and WFH opportunities',
    ],
  },
  {
    icon: <School className="w-6 h-6" />,
    title: 'Campus & NGO Portals',
    description: 'Dedicated dashboards for colleges, universities, and NGOs to manage placements, track student progress, and connect with verified employers.',
    points: [
      'Placement analytics and skill-gap reports',
      'Simplified campus drive management',
      'Community hiring programs for NGOs',
      'Admin-level control and reporting',
    ],
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'One-Click Apply',
    description: 'Apply for jobs instantly. Zekkers pre-fills your entire application using your verified profile, resume, and documents from your secure vault.',
    points: [
      'Auto-attaches the best version of your resume',
      'Generates custom cover letters with AI',
      'Track all applications in a unified dashboard',
      'Smart Document Vault integration',
    ],
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Intelligent Notifications',
    description: 'Never miss an opportunity with instant alerts for matched jobs, application status updates, interview invites, and AI roadmap milestones.',
    points: [
      'New job match alerts',
      'Application status updates',
      'Interview and assessment reminders',
      'AI-powered progress notifications',
    ],
  },
];

const FeatureCard = ({ feature, index, children }: { feature: typeof newFeatures[0], index: number, children?: React.ReactNode }) => (
    <MotionFade delay={index * 0.08}>
      <div
        className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-cyan-500/10 transform hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col h-full"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            {feature.icon}
          </div>
          <h3 className="text-lg font-extrabold text-foreground">{feature.title}</h3>
        </div>
        <p className="mt-4 text-sm text-muted-foreground flex-1">{feature.description}</p>
        {children || (
            <ul className="mt-4 space-y-2 text-sm">
                {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                    <span className="text-slate-400">{point}</span>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </MotionFade>
  );

export default function FeaturesSection() {
    const aiRoadmapFeature = {
        icon: <GitBranch className="w-6 h-6" />,
        title: 'AI Skill Roadmaps & Learning Guidance',
        description: 'Zekkers doesn’t just show jobs — it prepares you for them. AI reads your resume, education, and career goals to build a personalized skill roadmap that covers everything you need to succeed.',
        points: [] // We will replace this with the visual component
    };

    return (
        <section id="features" className="px-6 md:px-12 py-16">
            <div className="max-w-7xl mx-auto">
                <MotionFade>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">⭐ Why Zekkers?</h2>
                        <p className="mt-3 text-muted-foreground">
                            Trusted, intelligent, and built for students, professionals, colleges, NGOs, and verified employers.
                        </p>
                    </div>
                </MotionFade>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {newFeatures.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                    <div className="lg:col-span-3">
                         <FeatureCard feature={aiRoadmapFeature} index={newFeatures.length}>
                            <RoadmapVisual />
                         </FeatureCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
