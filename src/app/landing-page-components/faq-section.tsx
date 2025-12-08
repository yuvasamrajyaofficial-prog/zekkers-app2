
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
        <section id="faq" className="px-6 md:px-12 py-16">
            <div className="max-w-4xl mx-auto">
            <MotionFade>
                <div className="text-center">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
                    <HelpCircle className="text-primary"/> Frequently Asked Questions
                </h2>
                <p className="mt-3 text-muted-foreground">
                    Your questions, answered. Building trust through transparency.
                </p>
                </div>
            </MotionFade>
            <MotionFade delay={0.1}>
                <Accordion type="single" collapsible className="w-full mt-8">
                {faqs.map((faq, i) => (
                    <AccordionItem value={`item-${i}`} key={faq.question}>
                    <AccordionTrigger className="font-semibold text-lg text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
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
