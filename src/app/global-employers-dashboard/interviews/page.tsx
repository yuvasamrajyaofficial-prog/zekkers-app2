'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Video, Clock, User, Calendar as CalendarIcon } from 'lucide-react';

const interviews = [
  {
    id: 'INT-001',
    candidate: 'Alice Johnson',
    role: 'Frontend Developer',
    time: '10:00 AM - 11:00 AM',
    date: 'Today',
    type: 'Video Call',
    interviewer: 'You',
  },
  {
    id: 'INT-002',
    candidate: 'Bob Smith',
    role: 'Product Manager',
    time: '2:00 PM - 3:00 PM',
    date: 'Today',
    type: 'On-site',
    interviewer: 'Sarah Connor',
  },
  {
    id: 'INT-003',
    candidate: 'Charlie Brown',
    role: 'UX Designer',
    time: '11:00 AM - 12:00 PM',
    date: 'Tomorrow',
    type: 'Video Call',
    interviewer: 'You',
  },
];

export default function InterviewsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Interview Schedule</h1>
            <p className="text-muted-foreground">Manage your upcoming interviews and availability.</p>
        </div>
        <Button>
            <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Interview
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {interviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                {interview.candidate.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold">{interview.candidate}</h3>
                                <p className="text-sm text-muted-foreground">{interview.role}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {interview.time}</span>
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {interview.interviewer}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary">{interview.type}</Badge>
                            <Button size="sm">Join</Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
