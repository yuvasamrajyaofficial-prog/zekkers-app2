
'use client';
import React from 'react';
import MotionFade from '@/components/motion-fade';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Is Zekkers free for job seekers?",
    answer: "Yes, Zekkers is completely free for job seekers. Our mission is to provide you with the best tools to find your dream job without any cost. This includes creating a profile, using the AI roadmap, applying for jobs, and accessing learning resources."
  },
  {
    question: "How does Zekkers verify employers and jobs?",
    answer: "We take trust and safety very seriously. Our multi-layer verification process includes checking company registration documents (KYC), verifying official email domains, and manually reviewing job posts. Our AI also constantly monitors for fraudulent activity to ensure every listing is genuine and high-quality."
  },
  {
    question: "Are the government job listings on Zekkers authentic?",
    answer: "Absolutely. We aggregate government job announcements directly from official sources and verified channels. Each listing is clearly marked, and we provide links to the official notifications to ensure complete transparency."
  },
  {
    question: "How does the AI job matching work?",
    answer: "Our AI goes beyond simple keywords. It analyzes your entire profile—skills, experience, education, career goals, and even your resume—to understand your unique strengths. It then compares this against our database of verified jobs to provide a personalized match score with clear, explainable reasons, helping you understand why a job is a good fit for you."
  }
];


export default function FaqSection() {
    return (
        <section id="faq" className="px-6 md:px-12 py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
            <MotionFade>
                <div className="text-center mb-12">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-3 text-white">
                    <HelpCircle className="text-primary w-8 h-8"/> Frequently Asked Questions
                </h2>
                <p className="mt-3 text-slate-400">
                    Your questions, answered. Building trust through transparency.
                </p>
                </div>
            </MotionFade>
            <MotionFade delay={0.1}>
                <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                    <AccordionItem value={`item-${i}`} key={faq.question} className="border border-white/10 rounded-xl bg-slate-900/50 px-4">
                    <AccordionTrigger className="font-semibold text-lg text-left text-white hover:text-primary hover:no-underline py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-slate-400 text-base pb-4">
                        {faq.answer}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </MotionFade>
            </div>
      </section>
    );
}
