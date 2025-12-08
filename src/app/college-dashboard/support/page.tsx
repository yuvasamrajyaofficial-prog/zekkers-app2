
'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, MessageCircle, Mail, Book, Plus, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

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

export default function CollegeSupportHelp() {
  const [category, setCategory] = useState("general");
  const [showTicketForm, setShowTicketForm] = useState(false);

  const faqs = {
    general: [
      { q: "How do I update college details?", a: "Visit Settings → Institution Details and save changes." },
      { q: "How do I manage roles?", a: "Go to Settings → Admin Roles & Permissions to add or modify staff access." }
    ],
    students: [
      { q: "Why are some students missing?", a: "Check your filters or verify if the student has an active profile." },
      { q: "How to import student lists?", a: "Use the Exports & Reports page → Import Student Data." }
    ],
    placements: [
      { q: "How do I create a new placement drive?", a: "Go to Placement Drives → Create Drive and fill details." },
      { q: "Can companies view my student profiles?", a: "Yes, verified companies can view matched students only." }
    ]
  };

  const currentFaqs = faqs[category as keyof typeof faqs] || faqs.general;

  return (
    <div className="p-4 md:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold flex items-center gap-3"><HelpCircle className="text-primary"/> Support & Help</h1>
          <p className="text-slate-500 mt-1 max-w-2xl">Find answers, contact support, and manage help tickets for your institution.</p>
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input placeholder="Search help topics..." className="pl-10 h-12 text-base"/>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Book /> Frequently Asked Questions</CardTitle>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {Object.keys(faqs).map((c) => (
                  <Button
                    key={c}
                    variant={category === c ? 'default' : 'outline'}
                    onClick={() => setCategory(c)}
                    className="whitespace-nowrap"
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
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
                <CardTitle className="flex items-center gap-3"><MessageCircle /> Support Tickets</CardTitle>
                {!showTicketForm && (
                  <Button onClick={() => setShowTicketForm(true)} className="gap-2"><Plus /> New Ticket</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {showTicketForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 border rounded-lg mb-6 bg-slate-50">
                  <h3 className="font-semibold mb-3">Create Support Ticket</h3>
                  <div className="space-y-4">
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Describe your issue in detail..."></Textarea>
                    <div className="flex gap-2">
                      <Button>Submit Ticket</Button>
                      <Button variant="outline" onClick={() => setShowTicketForm(false)}>Cancel</Button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Your Tickets</h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Unable to upload student list</p>
                      <p className="text-xs text-muted-foreground">Status: Resolved • 3 Feb 2025</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">SSO connection failing</p>
                      <p className="text-xs text-muted-foreground">Status: In Progress • 5 Feb 2025</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
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
              <CardTitle className="flex items-center gap-3"><Mail /> Email Support</CardTitle>
              <CardDescription>support@zekkers.com</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Phone /> Phone Support</CardTitle>
              <CardDescription>+91 90000 00000</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
