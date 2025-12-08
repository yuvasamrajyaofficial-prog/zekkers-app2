
'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  LifeBuoy,
  Search,
  BookOpen,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const faqs = [
    { 
        category: 'Getting Started',
        questions: [
            { q: 'How do I verify my company profile?', a: 'Navigate to Organization > KYC & Global Compliance and complete all the required steps. This usually involves uploading business registration documents and verifying your official domain.' },
            { q: 'How do I invite my team members?', a: 'Go to Organization > Team & Permissions and click "Invite Recruiter". You can then assign them roles and country scopes.' },
        ]
    },
    {
        category: 'Job Posting',
        questions: [
            { q: 'What is the difference between a local and global job?', a: 'A global job is visible to our entire international talent pool and can be posted for any of our 54 supported countries. Local jobs are typically targeted within a specific country.' },
            { q: 'How does the AI Job Description Generator work?', a: 'Simply provide a job title and key skills. Our AI analyzes market data and best practices to generate a professional, optimized job description to attract top talent.' },
        ]
    },
    {
        category: 'Billing & Plans',
        questions: [
            { q: 'Where can I find my invoices?', a: 'All past invoices are available under Finance > Invoices. You can view and download them as PDFs.' },
            { q: 'How do I use credits?', a: 'Credits are used for premium features like Job Boosting, sending bulk emails, or advanced AI analysis. You can track your usage under Finance > Credit Usage.' },
        ]
    },
];

export default function HelpCenter() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = useMemo(() => {
        if (!searchTerm) return faqs;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return faqs.map(category => {
            const filteredQuestions = category.questions.filter(
                q => q.q.toLowerCase().includes(lowerCaseSearch) || q.a.toLowerCase().includes(lowerCaseSearch)
            );
            return { ...category, questions: filteredQuestions };
        }).filter(category => category.questions.length > 0);
    }, [searchTerm]);

  return (
    <div className="p-4 md:p-6">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <LifeBuoy className="text-primary" /> Help Center
            </CardTitle>
            <CardDescription>
              Find answers to common questions and learn how to make the most of the Zekkers platform.
            </CardDescription>
            <div className="relative pt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles..."
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
                <div className="space-y-8">
                    {filteredFaqs.map((category) => (
                        <motion.section key={category.category} variants={itemVariants}>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><BookOpen size={20} className="text-primary/80"/>{category.category}</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {category.questions.map((faq, i) => (
                                <AccordionItem value={`item-${i}`} key={`${category.category}-${i}`}>
                                    <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                                </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.section>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p className="font-semibold">No results found for "{searchTerm}"</p>
                    <p className="text-sm mt-1">Try a different search term or browse the categories.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
