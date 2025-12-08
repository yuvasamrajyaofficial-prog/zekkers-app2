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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ProfileData } from '@/services/profile';
import { fetchJobs } from '@/services/jobs';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Gauge } from '@/components/analytics/Gauge';
import ZLoader from '@/components/ui/loader';
import { Label } from '@/components/ui/label';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SkillGapPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: profileLoading } = useDoc<ProfileData>(userProfileRef);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      const fetchedJobs = await fetchJobs('all');
      setJobs(fetchedJobs);
      if (fetchedJobs.length > 0) {
        setSelectedJobId(fetchedJobs[0].id);
      }
      setLoading(false);
    }
    loadJobs();
  }, []);

  const analysis = useMemo(() => {
    if (!selectedJobId || !userProfile || !jobs.length) return null;

    const selectedJob = jobs.find(j => j.id === selectedJobId);
    if (!selectedJob) return null;

    const userSkills = new Set(userProfile.skills?.map(s => s.name.toLowerCase()) || []);
    const requiredSkills = new Set(selectedJob.skills?.map(s => s.toLowerCase()) || []);

    if (requiredSkills.size === 0) {
        return {
            job: selectedJob,
            skillScore: 100,
            matchedSkills: [],
            missingSkills: [],
        }
    }

    const matchedSkills = [...requiredSkills].filter(skill => userSkills.has(skill));
    const missingSkills = [...requiredSkills].filter(skill => !userSkills.has(skill));

    const skillScore = Math.round((matchedSkills.length / requiredSkills.size) * 100);

    return {
      job: selectedJob,
      skillScore,
      matchedSkills,
      missingSkills,
    };
  }, [selectedJobId, userProfile, jobs]);

  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                        <BrainCircuit className="text-primary" />
                        AI Skill Gap Analysis
                    </CardTitle>
                    <CardDescription>
                        Select a job to see how your skills match up and get AI-powered recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="job-select">Select a Job to Analyze</Label>
                    <Select value={selectedJobId || ''} onValueChange={setSelectedJobId}>
                        <SelectTrigger id="job-select" className="mt-1">
                            <SelectValue placeholder="Select a job..." />
                        </SelectTrigger>
                        <SelectContent>
                            {jobs.map(job => (
                                <SelectItem key={job.id} value={job.id}>
                                    {job.title} at {job.company}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
        </motion.div>
        
        {loading || profileLoading ? (
            <div className="flex justify-center items-center h-64"><ZLoader/></div>
        ) : !analysis ? (
             <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">No Job Selected</h3>
                <p className="text-sm text-slate-500 mt-1">Please select a job to begin your skill gap analysis.</p>
            </div>
        ) : (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <motion.div variants={itemVariants}>
                        <Card>
                             <CardHeader>
                                <CardTitle>Analysis for: {analysis.job.title}</CardTitle>
                                <CardDescription>Your skill alignment with the selected role.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row items-center justify-around gap-6">
                                <Gauge value={analysis.skillScore} label="AI Skill Score" size={150} />
                                <div className="flex-1 w-full space-y-4">
                                     <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600"><CheckCircle2 size={18}/>Matched Skills ({analysis.matchedSkills.length})</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.matchedSkills.length > 0 ? analysis.matchedSkills.map(s => <Badge key={s} className="bg-green-100 text-green-800 capitalize">{s}</Badge>) : <p className="text-xs text-muted-foreground">No matching skills found.</p>}
                                        </div>
                                    </div>
                                    <Separator />
                                     <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600"><XCircle size={18}/>Skill Gaps ({analysis.missingSkills.length})</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis.missingSkills.length > 0 ? analysis.missingSkills.map(s => <Badge key={s} variant="destructive" className="capitalize">{s}</Badge>) : <p className="text-xs text-muted-foreground">No skill gaps! You're a perfect match.</p>}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                     <Card className="bg-primary/5 border-primary/20 sticky top-20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary"><Lightbulb/>AI Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <h4 className="font-semibold text-sm">To bridge your skill gaps, we suggest:</h4>
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                {analysis.missingSkills.slice(0,2).map(skill => (
                                    <li key={skill}>Take an online course in <span className="font-bold capitalize">{skill}</span>.</li>
                                ))}
                                {analysis.missingSkills.length > 0 && <li>Build a project that utilizes "{analysis.missingSkills[0]}" to add to your portfolio.</li>}
                                {analysis.missingSkills.length === 0 && <li>Focus on advanced projects to stand out.</li>}
                            </ul>
                            <Button className="w-full gap-2"><BookOpen size={16}/>Find Learning Resources</Button>
                        </CardContent>
                    </Card>
                </motion.div>
             </div>
        )}
      </motion.div>
    </div>
  );
}
