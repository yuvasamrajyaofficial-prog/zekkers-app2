'use client';
import React from 'react';
import MotionFade from '@/components/motion-fade';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Asha R.',
    role: 'Placed - Developer at ZekkTech',
    quote: 'Zekkers’ AI matching was spot on. It found me a global role that perfectly matched my skills.',
    avatar: '👩‍💻',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    name: 'Dr. Vivek S.',
    role: 'Placement Head, ABC University',
    quote: 'The campus dashboard is a game-changer. We can finally track student progress efficiently.',
    avatar: '🎓',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    name: 'Maya P.',
    role: 'Recruiter, InfoLabs',
    quote: 'The quality of applicants is outstanding. Screening time reduced by over 60%.',
    avatar: '💼',
    color: 'bg-green-500/10 text-green-400 border-green-500/20'
  },
  {
    name: 'Kenji T.',
    role: 'Global Applicant, Japan',
    quote: "Trust is everything. Zekkers' verification process made my search secure.",
    avatar: '🌏',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    name: 'Sarah L.',
    role: 'HR Director, TechFlow',
    quote: 'We hired 5 developers in a week. The AI matching is incredibly accurate.',
    avatar: '🚀',
    color: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
  },
  {
    name: 'Rahul M.',
    role: 'Student, IIT Bombay',
    quote: 'The skill roadmap helped me learn exactly what employers were looking for.',
    avatar: '📚',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
];

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
    <div className="w-[350px] p-6 rounded-2xl bg-card border border-white/5 backdrop-blur-sm mx-4 flex flex-col h-full hover:border-primary/20 transition-colors">
        <div className="flex items-center gap-4 mb-4">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl border", t.color)}>
                {t.avatar}
            </div>
            <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            "{t.quote}"
        </p>
    </div>
);

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
             {/* Background Gradients */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto mb-16 px-6 md:px-12 relative z-10">
                <MotionFade>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Success Stories
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Real people. Real outcomes. Join the community.
                        </p>
                    </div>
                </MotionFade>
            </div>

            <div className="relative z-10 flex flex-col gap-8">
                {/* Row 1: Left to Right */}
                <div className="flex overflow-hidden">
                    <motion.div 
                        className="flex"
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                            <TestimonialCard key={`${t.name}-${i}`} t={t} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Right to Left */}
                <div className="flex overflow-hidden">
                    <motion.div 
                        className="flex"
                        animate={{ x: [-1000, 0] }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    >
                        {[...testimonials.reverse(), ...testimonials, ...testimonials].map((t, i) => (
                            <TestimonialCard key={`${t.name}-rev-${i}`} t={t} />
                        ))}
                    </motion.div>
                </div>
            </div>
            
            {/* Fade Edges */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
        </section>
    );
}
