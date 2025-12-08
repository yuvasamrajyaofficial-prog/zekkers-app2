
'use client';
import React, { useState, useMemo, useEffect } from 'react';
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
  FileText,
  PlusCircle,
  Search,
  CheckCircle,
  ChevronDown,
  User,
  Building,
  Calendar,
  Send,
  UploadCloud,
  Mail,
  HardDrive,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { addDays, format } from 'date-fns';
import { Job } from '@/types/job';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';
import { Candidate } from '@/types/candidate';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';

// --- Types ---
type OnboardingTaskStatus = 'Pending' | 'Completed' | 'Skipped';
interface OnboardingTask {
    id: string;
    title: string;
    category: 'Documentation' | 'IT Setup' | 'Welcome Kit' | 'HR Formalities';
    status: OnboardingTaskStatus;
    dueDate?: string;
}

interface OnboardingProfile {
    id: string;
    candidate: Candidate;
    job: Job;
    startDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    tasks: OnboardingTask[];
}

// --- Mock Data ---
const mockOnboardingProfiles: OnboardingProfile[] = [
    {
        id: 'onboard-1',
        candidate: MOCK_CANDIDATES[0],
        job: MOCK_JOBS[0],
        startDate: '2025-09-01',
        status: 'In Progress',
        tasks: [
            { id: 't1-1', title: 'Sign Offer Letter', category: 'Documentation', status: 'Completed', dueDate: '2025-08-10' },
            { id: 't1-2', title: 'Submit ID & Address Proof', category: 'Documentation', status: 'Completed', dueDate: '2025-08-15' },
            { id: 't1-3', title: 'Send Welcome Kit', category: 'Welcome Kit', status: 'Pending', dueDate: '2025-08-20' },
            { id: 't1-4', title: 'Create Official Email', category: 'IT Setup', status: 'Pending', dueDate: '2025-08-25' },
        ]
    },
    {
        id: 'onboard-2',
        candidate: MOCK_CANDIDATES[1],
        job: MOCK_JOBS[1],
        startDate: '2025-09-15',
        status: 'Not Started',
        tasks: [
            { id: 't2-1', title: 'Sign Offer Letter', category: 'Documentation', status: 'Pending', dueDate: '2025-08-25' },
            { id: 't2-2', title: 'Submit ID & Address Proof', category: 'Documentation', status: 'Pending', dueDate: '2025-08-30' },
        ]
    }
];

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };


// --- Sub-Components ---
const OnboardingTaskItem = ({ task, onToggle }: { task: OnboardingTask; onToggle: (id: string) => void }) => {
    const isCompleted = task.status === 'Completed';
    return (
        <div className="flex items-center gap-3 p-3 bg-white rounded-md border">
            <Checkbox checked={isCompleted} onCheckedChange={() => onToggle(task.id)} id={`task-${task.id}`} />
            <Label htmlFor={`task-${task.id}`} className={`flex-1 cursor-pointer ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
            </Label>
            <Badge variant="outline" className="hidden sm:inline-flex">{task.category}</Badge>
            {task.dueDate && <span className="text-xs text-muted-foreground hidden sm:inline">{format(new Date(task.dueDate), 'MMM dd')}</span>}
        </div>
    )
}

const OnboardingProfileCard = ({ profile, onTaskToggle }: { profile: OnboardingProfile; onTaskToggle: (profileId: string, taskId: string) => void; }) => {
    const completedTasks = profile.tasks.filter(t => t.status === 'Completed').length;
    const progress = (completedTasks / profile.tasks.length) * 100;
    
    const taskCategoryIcons = {
        Documentation: <FileText size={16} />,
        'IT Setup': <HardDrive size={16} />,
        'Welcome Kit': <Send size={16} />,
        'HR Formalities': <User size={16} />,
    };

    return (
        <motion.div variants={itemVariants}>
            <Collapsible className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12"><AvatarImage src={profile.candidate.avatar} /><AvatarFallback>{profile.candidate.name.slice(0, 2)}</AvatarFallback></Avatar>
                            <div>
                                <CardTitle>{profile.candidate.name}</CardTitle>
                                <CardDescription>{profile.job.title}</CardDescription>
                            </div>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-2">
                                Details <ChevronDown className="w-4 h-4 transition-transform [&[data-state=open]]:rotate-180"/>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                     <div className="mt-4 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2"><Calendar size={14} className="text-muted-foreground"/> Joining: {format(new Date(profile.startDate), 'PPP')}</div>
                        <div className="flex items-center gap-2"><Building size={14} className="text-muted-foreground"/> {profile.job.location}, {profile.job.country}</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Progress value={progress} className="flex-1 h-2"/>
                        <span className="font-semibold text-sm">{Math.round(progress)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{completedTasks} of {profile.tasks.length} tasks completed</p>
                </CardContent>

                <CollapsibleContent>
                    <div className="p-4 border-t bg-slate-50/50 space-y-3">
                        <h4 className="font-semibold">Onboarding Checklist</h4>
                        {Object.entries(taskCategoryIcons).map(([category, icon]) => {
                            const categoryTasks = profile.tasks.filter(t => t.category === category);
                            if (categoryTasks.length === 0) return null;
                            return (
                                <div key={category}>
                                    <h5 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-2">{icon} {category}</h5>
                                    <div className="space-y-2">
                                        {categoryTasks.map(task => (
                                            <OnboardingTaskItem key={task.id} task={task} onToggle={(taskId) => onTaskToggle(profile.id, taskId)} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </motion.div>
    );
};


// --- Main Component ---
export default function OnboardingPage() {
    const [profiles, setProfiles] = useState(mockOnboardingProfiles);
    const { toast } = useToast();

    const handleCreateTemplate = () => {
        toast({ title: "Create Template (Mock)", description: "This would open a modal to create a new onboarding task template." });
    };

    const handleTaskToggle = (profileId: string, taskId: string) => {
        setProfiles(prevProfiles =>
            prevProfiles.map(p => {
                if (p.id === profileId) {
                    return {
                        ...p,
                        tasks: p.tasks.map(t => {
                            if (t.id === taskId) {
                                return { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' };
                            }
                            return t;
                        })
                    };
                }
                return p;
            })
        );
    };

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><CheckCircle/> Onboarding</CardTitle>
              <CardDescription>Collect documents, track tasks and welcome new hires.</CardDescription>
            </div>
            <Button onClick={handleCreateTemplate}><PlusCircle size={16} className="mr-2"/> Create Template</Button>
          </div>
        </CardHeader>
        <CardContent>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {profiles.map(profile => (
                    <OnboardingProfileCard key={profile.id} profile={profile} onTaskToggle={handleTaskToggle} />
                ))}
            </motion.div>
             {profiles.length === 0 && (
                 <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                    <Users className="w-12 h-12 mx-auto text-slate-400" />
                    <h3 className="mt-4 font-semibold text-lg">No Active Onboardings</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        When an offer is accepted, the candidate will appear here.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
