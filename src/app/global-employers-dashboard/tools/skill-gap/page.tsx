
'use client';
import React, { useState, useMemo } from 'react';
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
  TrendingDown,
  Users,
  Target,
  BarChart,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from 'recharts';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';
import { Job } from '@/types/job';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { Candidate } from '@/types/candidate';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// --- Animation Variants ---
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

// --- Sub-Components ---
const StatCard = ({ title, value, icon, subtext }: { title: string, value: string, icon: React.ReactNode, subtext?: string }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-primary">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
            </CardContent>
        </Card>
    </motion.div>
);


// --- Main Component ---
export default function SkillGapAnalyzerPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>(MOCK_JOBS[0].id);

  const analysis = useMemo(() => {
    const job = MOCK_JOBS.find(j => j.id === selectedJobId);
    if (!job) return null;

    const requiredSkills = new Set(job.skills);
    const applicants = MOCK_CANDIDATES.filter(c => c.jobId === selectedJobId);
    if(applicants.length === 0) return { job, applicants: 0, overallMatch: 0, topMissing: [], readiness: 0, topCandidates: [] };

    let totalSkillMatches = 0;
    const missingSkillCounts: Record<string, number> = {};
    requiredSkills.forEach(skill => missingSkillCounts[skill] = 0);

    applicants.forEach(applicant => {
        const applicantSkills = new Set(applicant.skills);
        requiredSkills.forEach(reqSkill => {
            if (applicantSkills.has(reqSkill)) {
                totalSkillMatches++;
            } else {
                missingSkillCounts[reqSkill]++;
            }
        });
    });

    const overallMatch = (totalSkillMatches / (requiredSkills.size * applicants.length)) * 100;
    const topMissing = Object.entries(missingSkillCounts)
        .filter(([, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([skill, count]) => ({ skill, percentage: (count / applicants.length) * 100 }));
        
    const readiness = applicants.filter(a => a.aiMatchScore > 80).length / applicants.length * 100;
    
    const topCandidates = applicants.sort((a,b) => b.aiMatchScore - a.aiMatchScore).slice(0,3);

    return { job, applicants: applicants.length, overallMatch: Math.round(overallMatch), topMissing, readiness: Math.round(readiness), topCandidates };
  }, [selectedJobId]);

  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <BrainCircuit className="text-primary" />
                    AI Skill Gap Analyzer
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Identify skill gaps in your talent pipeline and get AI-powered recommendations.
                  </CardDescription>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="job-select">Analyze skill gaps for job:</Label>
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                    <SelectTrigger id="job-select" className="w-full md:w-1/2 mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {MOCK_JOBS.map(job => (
                            <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
        
        {analysis && (
            <>
            {/* KPIs */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Overall Skill Match" value={`${analysis.overallMatch}%`} icon={<Target/>} subtext={`${analysis.applicants} applicants`}/>
                <StatCard title="Top Missing Skill" value={analysis.topMissing[0]?.skill || 'N/A'} icon={<TrendingDown className="text-destructive"/>} subtext={`${Math.round(analysis.topMissing[0]?.percentage || 0)}% of applicants`}/>
                <StatCard title="Talent Pool Readiness" value={`${analysis.readiness}%`} icon={<Users/>} subtext="Candidates >80% match"/>
                <StatCard title="Top Candidate" value={analysis.topCandidates[0]?.name || 'N/A'} icon={<Users/>} subtext={`${analysis.topCandidates[0]?.aiMatchScore}% match`}/>
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart/> Top Missing Skills</CardTitle>
                            <CardDescription>Percentage of applicants missing a required skill.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <RechartsBarChart data={analysis.topMissing} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" unit="%" />
                                    <YAxis dataKey="skill" type="category" width={80} tickLine={false} axisLine={false} />
                                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                                    <Bar dataKey="percentage" name="% Missing" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}/>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
              </div>

              {/* Right Sidebar Column */}
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                    <Card className="bg-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary"><Lightbulb/> AI Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <p><strong>Training:</strong> Consider a workshop on "{analysis.topMissing[0]?.skill}" to upskill your current pool.</p>
                            <p className="border-t pt-3"><strong>Sourcing:</strong> Search for candidates with skills like "{analysis.topMissing[1]?.skill}" to fill immediate gaps.</p>
                            <Button size="sm" className="w-full mt-2">Find "{analysis.topMissing[1]?.skill}" Candidates</Button>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader><CardTitle>Required Skills</CardTitle></CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-2">
                                {analysis.job.skills?.map(skill => <Badge key={skill}>{skill}</Badge>)}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
              </div>
            </div>
            </>
        )}

      </motion.div>
    </div>
  );
}
