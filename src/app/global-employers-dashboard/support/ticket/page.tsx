'use client';
import React, { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RaiseTicket() {
    const { toast } = useToast();
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = () => {
        if (!subject || !category || !description) {
            toast({
                title: "Missing Information",
                description: "Please fill out all required fields.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Support Ticket Submitted",
            description: "Your request has been received. Our team will get back to you shortly.",
        });
        // Reset form
        setSubject('');
        setCategory('');
        setDescription('');
        setFile(null);
    };

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                        <MessageSquare className="text-primary" /> Create a Support Ticket
                    </CardTitle>
                    <CardDescription>
                        Need help? Submit a request and our support team will get back to you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className="space-y-6 max-w-2xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input 
                                    id="subject" 
                                    placeholder="e.g., Issue with billing"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select a category..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical Issue</SelectItem>
                                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                                        <SelectItem value="integration">Integration Help</SelectItem>
                                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                placeholder="Please describe your issue in detail..." 
                                rows={8}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="attachment">Attachments (optional)</Label>
                            <div className="p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                                <UploadCloud className="w-8 h-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {file ? file.name : 'Drag & drop a file here, or click to upload'}
                                </p>
                                <Input id="attachment" type="file" className="sr-only" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}/>
                                <Label htmlFor="attachment" className="mt-2 text-primary text-sm font-semibold cursor-pointer">
                                    Choose file
                                </Label>
                            </div>
                        </div>

                        <div>
                            <Button size="lg" onClick={handleSubmit}>Submit Ticket</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}