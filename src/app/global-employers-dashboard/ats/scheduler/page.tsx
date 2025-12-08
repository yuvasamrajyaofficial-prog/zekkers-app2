
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
import {
  Calendar as CalendarIcon,
  PlusCircle,
  Video,
  Clock,
  Users,
  X,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { addDays, format } from 'date-fns';
import { Combobox } from '@/components/ui/combobox';
import { Job } from '@/types/job';
import { Candidate } from '@/types/candidate';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const mockInterviews = [
  {
    id: 'int-1',
    candidate: MOCK_CANDIDATES[0],
    job: MOCK_JOBS[0],
    date: addDays(new Date(), 2),
    time: '14:00 (IST)',
    type: 'Technical Round 1',
    interviewers: ['rohit.mehra@zekktech.com'],
  },
  {
    id: 'int-2',
    candidate: MOCK_CANDIDATES[1],
    job: MOCK_JOBS[1],
    date: addDays(new Date(), 3),
    time: '11:00 (GMT)',
    type: 'HR Round',
    interviewers: ['anjali.desai@zekktech.com', 'hr@zekktech.com'],
  },
];

const InterviewCard = ({ interview }: { interview: (typeof mockInterviews)[0] }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex-row items-start gap-4">
                {interview.candidate.avatar && <Avatar>
                    <AvatarImage src={interview.candidate.avatar}/>
                    <AvatarFallback>{interview.candidate.name.slice(0,2)}</AvatarFallback>
                </Avatar>}
                <div>
                    <CardTitle className="text-lg">{interview.candidate.name}</CardTitle>
                    <CardDescription>for {interview.job.title}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><Clock size={14}/> {format(interview.date, 'PPP')} @ {interview.time}</div>
                <div className="flex items-center gap-2 text-sm"><Video size={14}/> {interview.type}</div>
                <div className="flex items-center gap-2 text-sm"><Users size={14}/> {interview.interviewers.join(', ')}</div>
                <div className="flex justify-end">
                    <Button size="sm" variant="outline">View Details</Button>
                </div>
            </CardContent>
        </Card>
    </motion.div>
)

export default function InterviewScheduler() {
    const [isScheduling, setIsScheduling] = useState(false);
    const [panelists, setPanelists] = useState<string[]>([]);
    const [currentPanelist, setCurrentPanelist] = useState('');

    const candidateOptions = React.useMemo(() => MOCK_CANDIDATES.map(c => ({
        value: c.id,
        label: `${c.name} (${c.jobAppliedFor})`,
    })), []);

    const addPanelist = () => {
        if(currentPanelist && !panelists.includes(currentPanelist)) {
            setPanelists([...panelists, currentPanelist]);
            setCurrentPanelist('');
        }
    }
    const removePanelist = (email: string) => {
        setPanelists(panelists.filter(p => p !== email));
    }

  return (
    <div className="p-4 md:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <CalendarIcon className="text-primary" /> Interview Scheduler
            </h1>
            <p className="text-muted-foreground mt-1">
              Schedule interviews across time zones with panel invites.
            </p>
          </div>
          <Dialog open={isScheduling} onOpenChange={setIsScheduling}>
            <DialogTrigger asChild>
                <Button className="gap-2"><PlusCircle size={16} /> Schedule New Interview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Schedule Interview</DialogTitle>
                    <DialogDescription>Fill out the details to schedule a new interview.</DialogDescription>
                </DialogHeader>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Candidate</Label>
                        <Combobox 
                            options={candidateOptions}
                            placeholder="Select a candidate..."
                            searchPlaceholder="Search candidates..."
                            notFoundText="No candidates found."
                            onSelect={(value) => console.log('Selected:', value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="job">Job</Label>
                        <Select><SelectTrigger id="job"><SelectValue placeholder="Select a job role..."/></SelectTrigger><SelectContent>
                            {MOCK_JOBS.map(j => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}
                        </SelectContent></Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select><SelectTrigger id="timezone"><SelectValue placeholder="Select a timezone..."/></SelectTrigger><SelectContent>
                           <SelectItem value="ist">IST (India)</SelectItem>
                           <SelectItem value="cet">CET (Europe)</SelectItem>
                           <SelectItem value="pst">PST (US Pacific)</SelectItem>
                        </SelectContent></Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Interview Type</Label>
                        <Input id="type" placeholder="e.g., Technical Round 1"/>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="panelists">Interview Panel</Label>
                        <div className="flex gap-2">
                            <Input id="panelists" placeholder="Add interviewer email..." value={currentPanelist} onChange={e => setCurrentPanelist(e.target.value)}/>
                            <Button type="button" variant="outline" onClick={addPanelist}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {panelists.map(p => (
                                <Badge key={p} variant="secondary" className="gap-1.5">
                                    {p} <X size={12} className="cursor-pointer" onClick={() => removePanelist(p)} />
                                </Badge>
                            ))}
                        </div>
                    </div>
                     <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="notes">Notes for Panel</Label>
                        <Textarea id="notes" placeholder="Include any specific instructions or topics to cover..."/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsScheduling(false)}>Cancel</Button>
                    <Button onClick={() => setIsScheduling(false)}>Send Invites</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar mode="single" selected={new Date()} className="rounded-md border"/>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockInterviews.length > 0 ? (
                            <div className="space-y-4">
                                {mockInterviews.map(interview => (
                                    <InterviewCard key={interview.id} interview={interview} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                No interviews scheduled.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
