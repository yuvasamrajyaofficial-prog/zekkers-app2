
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Channel = 'inapp' | 'push' | 'email' | 'sms';
type Category = 'general' | 'training' | 'placement' | 'emergency';

export default function NgoNotificationsPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState<Category>('general');
    const [channels, setChannels] = useState<Record<Channel, boolean>>({ inapp: true, push: true, email: false, sms: false });
    const [audienceType, setAudienceType] = useState<'all' | 'program' | 'cohort'>('all');
    const [audienceFilter, setAudienceFilter] = useState('');
    const { toast } = useToast();

    const toggleCh = (c: Channel) => setChannels(prev => ({ ...prev, [c]: !prev[c] }));

    const send = async () => {
        if (!title || !body) {
            toast({ variant: 'destructive', title: "Title and message body are required."});
            return;
        }
        // In a real app, this would write to the /notifications collection in Firestore
        toast({
            title: "Notification Sent (Mock)",
            description: `Your message has been queued for delivery to the "${audienceType}" audience.`,
        });
    };

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-full">
            <h1 className="text-2xl font-semibold mb-4">Send Notification</h1>
            <p className="text-sm text-slate-500 mb-4 max-w-3xl">
                Send targeted alerts to your beneficiaries about training sessions, job opportunities, or important announcements.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Message Content</CardTitle>
                        <CardDescription>Craft the message you want to send.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g., Reminder: Digital Literacy Class" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="body">Body</Label>
                            <Textarea id="body" placeholder="Your message content here..." value={body} onChange={e => setBody(e.target.value)} rows={6} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={(v: Category) => setCategory(v)}>
                                <SelectTrigger id="category">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General Announcement</SelectItem>
                                    <SelectItem value="training">Training Update</SelectItem>
                                    <SelectItem value="placement">Placement Opportunity</SelectItem>
                                    <SelectItem value="emergency">Emergency Alert</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Channels</Label>
                             <div className="flex flex-wrap items-center gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="inapp" checked={channels.inapp} onCheckedChange={() => toggleCh('inapp')} />
                                    <Label htmlFor="inapp" className="font-normal">In-app</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="push" checked={channels.push} onCheckedChange={() => toggleCh('push')} />
                                    <Label htmlFor="push" className="font-normal">Push</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="email" checked={channels.email} onCheckedChange={() => toggleCh('email')} />
                                    <Label htmlFor="email" className="font-normal">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="sms" checked={channels.sms} onCheckedChange={() => toggleCh('sms')} />
                                    <Label htmlFor="sms" className="font-normal">SMS</Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader>
                        <CardTitle>Audience</CardTitle>
                        <CardDescription>Choose who receives this.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="audience">Audience</Label>
                             <Select value={audienceType} onValueChange={(v: any) => setAudienceType(v)}>
                                <SelectTrigger id="audience">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Participants</SelectItem>
                                    <SelectItem value="program">By Program</SelectItem>
                                    <SelectItem value="cohort">By Cohort</SelectItem>
                                </SelectContent>
                            </Select>
                            {audienceType !== 'all' && (
                                <Input 
                                    placeholder={audienceType === 'program' ? 'e.g., Digital Literacy' : 'e.g., DL-Mumbai-Q3'}
                                    value={audienceFilter} 
                                    onChange={e => setAudienceFilter(e.target.value)} 
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Button onClick={send} className="gap-2 w-full">
                                <Send size={16} /> Send Message
                            </Button>
                             <Button variant="outline" className="gap-2 w-full">
                                <Eye size={16} /> Preview
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
