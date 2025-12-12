'use client';
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Book,
  Plus,
  Phone,
  LifeBuoy,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const faqs = {
  general: [
    {
      q: 'How do I update my company profile?',
      a: 'Navigate to Company Profile → Basic Info and click "Edit". Make your changes and hit "Save".',
    },
    {
      q: 'How do I manage team member roles?',
      a: 'Go to Company Profile → Team Members. From there, you can invite new members or change the roles of existing ones.',
    },
  ],
  billing: [
    {
      q: 'Where can I find my invoices?',
      a: 'All past invoices are available under Billing & Plans → Billing History. You can download them as PDFs.',
    },
    {
      q: 'How do I upgrade my plan?',
      a: 'Visit the Billing & Plans page. You will see a comparison of all available plans. Click "Upgrade" on the plan you wish to move to.',
    },
  ],
  jobs: [
    {
      q: 'How do I use the AI Job Description Generator?',
      a: 'Go to Job Management → AI JD Generator. Fill in the key details about the role, and the AI will create a professional job description for you.',
    },
    {
      q: 'Can I post jobs in multiple countries?',
      a: 'Yes, if your plan includes Global Hiring. You can post jobs in any of the 54 supported countries from the "Post Global Job" section.',
    },
  ],
};

export default function EmployerSupportPage() {
  const [category, setCategory] = useState('general');
  const [showTicketForm, setShowTicketForm] = useState(false);

  const currentFaqs = faqs[category as keyof typeof faqs] || faqs.general;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LifeBuoy className="text-primary" /> Support & Help
          </h1>
          <p className="text-slate-500 mt-1 max-w-2xl">
            Find answers, contact support, and manage help tickets for your
            organization.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search help articles & FAQs..."
              className="pl-10 h-12 text-base"
            />
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Book /> Frequently Asked Questions
              </CardTitle>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {Object.keys(faqs).map((c) => (
                  <Button
                    key={c}
                    variant={category === c ? 'default' : 'outline'}
                    onClick={() => setCategory(c)}
                    className="whitespace-nowrap capitalize"
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {currentFaqs.map((f, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ticket System */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle /> Support Tickets
                </CardTitle>
                {!showTicketForm && (
                  <Button
                    onClick={() => setShowTicketForm(true)}
                    className="gap-2"
                  >
                    <Plus /> New Ticket
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {showTicketForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 border rounded-lg mb-6 bg-slate-50"
                >
                  <h3 className="font-semibold mb-3">Create Support Ticket</h3>
                  <div className="space-y-4">
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Describe your issue in detail..."></Textarea>
                    <div className="flex gap-2">
                      <Button>Submit Ticket</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowTicketForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Your Tickets</h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        Integration with Greenhouse failing
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Status: In Progress • 3 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice for July missing</p>
                      <p className="text-xs text-muted-foreground">
                        Status: Resolved • 2 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail /> Email Support
              </CardTitle>
              <CardDescription>support@zekkers.com</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone /> Phone Support
              </CardTitle>
              <CardDescription>+91 90000 00000 (Mon-Fri, 9am-6pm IST)</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
