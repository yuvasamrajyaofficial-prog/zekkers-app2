'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, HelpCircle, FileText, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SupportSettingsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support & Help</h1>
        <p className="text-muted-foreground">Get help with your account or report an issue.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Contact Support</CardTitle>
                <CardDescription>Send us a message and we'll get back to you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What can we help you with?" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue in detail..." rows={5} />
                </div>
                <Button className="w-full">Send Message</Button>
            </CardContent>
        </Card>

        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5" /> FAQs</CardTitle>
                    <CardDescription>Common questions and answers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                            <AccordionContent>
                                You can reset your password by going to the login page and clicking on "Forgot Password". Follow the instructions sent to your email.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How can I update my resume?</AccordionTrigger>
                            <AccordionContent>
                                Go to your Profile page and click on the "Edit Resume" button. You can upload a new file or edit your details directly.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is my profile visible to everyone?</AccordionTrigger>
                            <AccordionContent>
                                You can control your profile visibility in the Privacy Settings. By default, it is visible to registered employers.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Other Ways to Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                        <span className="text-sm font-medium">Email Support</span>
                        <span className="text-sm text-blue-600">support@zekkers.com</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md bg-slate-50">
                        <span className="text-sm font-medium">Twitter Support</span>
                        <span className="text-sm text-blue-600">@ZekkersSupport</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
