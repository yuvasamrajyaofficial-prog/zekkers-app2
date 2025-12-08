
'use client';
import React from 'react';
import MotionFade from '@/components/motion-fade';

const testimonials = [
  {
    name: 'Asha R.',
    role: 'Placed - Developer at ZekkTech',
    quote: 'Zekkers’ AI matching was spot on. It found me a global role that perfectly matched my skills, and the verification badge gave me the confidence to apply. I landed the job in 30 days!',
  },
  {
    name: 'Dr. Vivek S.',
    role: 'Placement Head, ABC University',
    quote: 'The campus dashboard is a game-changer. We can finally track student progress, connect with verified employers, and manage campus drives efficiently. Our placement rate has improved by 20%.',
  },
  {
    name: 'Maya P.',
    role: 'Recruiter, InfoLabs',
    quote: 'The quality of applicants from Zekkers is outstanding. The AI ranking and verified profiles reduce our screening time by over 60%, allowing us to focus on the best talent.',
  },
  {
    name: 'Kenji T.',
    role: 'Global Applicant, Japan',
    quote: "As a global applicant, trust is everything. Zekkers' unified platform for global jobs and its clear verification process made my search for a job in a new country feel secure and straightforward.",
  },
];

export default function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            className="px-6 md:px-12 py-12"
        >
            <div className="max-w-7xl mx-auto">
            <MotionFade>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">Success stories</h3>
                <p className="text-sm text-muted-foreground mt-2">
                Real people. Real outcomes.
                </p>
            </MotionFade>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {testimonials.map((t, i) => (
                <MotionFade key={t.name} delay={i * 0.06}>
                    <blockquote
                    className="p-6 bg-card border border-border/50 rounded-2xl shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
                    >
                    <div className="text-sm text-muted-foreground flex-1">"{t.quote}"</div>
                    <div className="mt-4 font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                    </blockquote>
                </MotionFade>
                ))}
            </div>
            </div>
        </section>
    );
}
