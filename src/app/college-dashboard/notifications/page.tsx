
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

type Channel = 'inapp' | 'push' | 'email' | 'sms';
type Category = 'system' | 'job_match' | 'drive' | 'assessment' | 'application' | 'marketing' | 'security';

export default function CollegeNotificationsPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState<Category>('drive');
    const [channels, setChannels] = useState<Record<Channel, boolean>>({ inapp: true, push: true, email: true, sms: false });
    const [audienceType, setAudienceType] = useState<'all' | 'dept' | 'batch' | 'list'>('all');
    const [audienceFilter, setAudienceFilter] = useState('');
    const [scheduleAt, setScheduleAt] = useState<string | null>(null);

    const toggleCh = (c: Channel) => setChannels(prev => ({ ...prev, [c]: !prev[c] }));

    const preview = () => ({ title, body, category, channels, audienceType, audienceFilter, scheduleAt });

    const send = async () => {
        // In a real app, this would write to the /notifications collection in Firestore
        alert('Notification created (mock). In production, this would trigger a Cloud Function to fan out the message.');
    };

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-full">
            <h1 className="text-2xl font-semibold mb-4">Compose Notification</h1>
            <p className="text-sm text-slate-500 mb-4 max-w-3xl">Send targeted alerts to students about placement drives, workshops, or important announcements. Use the audience filters to ensure the right students get the right message.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Message Content</CardTitle>
                        <CardDescription>Craft the message you want to send.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g., Upcoming Placement Drive: ZekkTech" value={title} onChange={e => setTitle(e.target.value)} />
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
                                    <SelectItem value="drive">Placement Drive</SelectItem>
                                    <SelectItem value="assessment">Assessment</SelectItem>
                                    <SelectItem value="system">Campus Announcement</SelectItem>
                                    <SelectItem value="job_match">Job Opportunity</SelectItem>
                                    <SelectItem value="application">Application Update</SelectItem>
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
                        <CardTitle>Audience & Schedule</CardTitle>
                        <CardDescription>Choose who receives this and when.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="audience">Audience</Label>
                             <Select value={audienceType} onValueChange={(v: any) => setAudienceType(v)}>
                                <SelectTrigger id="audience">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Students in College</SelectItem>
                                    <SelectItem value="dept">By Department</SelectItem>
                                    <SelectItem value="batch">By Batch Year</SelectItem>
                                    <SelectItem value="list">Specific Students (by Roll No.)</SelectItem>
                                </SelectContent>
                            </Select>
                            {audienceType !== 'all' && (
                                <Input 
                                    placeholder={audienceType === 'list' ? 'Enter comma-separated Roll Numbers' : 'e.g., Computer Science or 2024'}
                                    value={audienceFilter} 
                                    onChange={e => setAudienceFilter(e.target.value)} 
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="schedule">Schedule (optional)</Label>
                            <Input id="schedule" type="datetime-local" onChange={e => setScheduleAt(e.target.value || null)} />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <Button variant="outline" onClick={() => alert(JSON.stringify(preview(), null, 2))} className="gap-2 w-full sm:w-auto">
                                <Eye size={16} /> Preview
                            </Button>
                            <Button onClick={send} className="gap-2 w-full sm:w-auto">
                                <Send size={16} /> Create & Send
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
