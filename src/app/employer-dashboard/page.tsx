
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  Search,
  Settings,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MessageSquare,
  Building,
  HelpCircle,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Mock Data ---

const kpiData = [
  { title: 'Active Jobs', value: '12', trend: '+2', trendType: 'increase', icon: <Briefcase /> },
  { title: 'New Applicants', value: '48', trend: '+15 today', trendType: 'increase', icon: <Users /> },
  { title: 'Shortlisted', value: '22', trend: '-3', trendType: 'decrease', icon: <UserCheck /> },
  { title: 'Interviews Scheduled', value: '8', trend: '+4', trendType: 'increase', icon: <Calendar /> },
  { title: 'Offers Released', value: '3', trend: 'steady', trendType: 'neutral', icon: <FileText /> },
  { title: 'Avg. Time-to-Hire', value: '28 days', trend: '-2d', trendType: 'decrease', icon: <Clock /> },
];

const recentApplicants = [
    { name: 'Anjali Sharma', role: 'Frontend Developer', match: 92, resume: 88, avatar: PlaceHolderImages.find(p => p.id === 'avatar1')!.imageUrl },
    { name: 'Rohan Verma', role: 'Data Analyst', match: 85, resume: 91, avatar: PlaceHolderImages.find(p => p.id === 'avatar2')!.imageUrl },
    { name: 'Priya Singh', role: 'UX/UI Designer', match: 78, resume: 82, avatar: PlaceHolderImages.find(p => p.id === 'avatar3')!.imageUrl },
];

const jobPerformance = [
    { title: 'Frontend Developer', status: 'Active', applicants: 120, views: 2500, shortlisted: 15, conversion: '12.5%' },
    { title: 'Backend Engineer', status: 'Active', applicants: 85, views: 1800, shortlisted: 8, conversion: '9.4%' },
    { title: 'Data Scientist', status: 'Paused', applicants: 210, views: 4500, shortlisted: 25, conversion: '11.9%' },
];

// --- Sub-Components ---

const KpiCard = ({ kpi }: { kpi: typeof kpiData[0] }) => {
    const trendColor = kpi.trendType === 'increase' ? 'text-green-600' : kpi.trendType === 'decrease' ? 'text-red-600' : 'text-slate-500';
    const TrendIcon = kpi.trendType === 'increase' ? TrendingUp : TrendingDown;
    return (
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <div className="text-muted-foreground">{kpi.icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${trendColor}`}>
                    {kpi.trendType !== 'neutral' && <TrendIcon className="w-3 h-3" />}
                    {kpi.trend}
                </p>
            </CardContent>
        </Card>
    )
}

const ApplicantCard = ({ applicant }: { applicant: typeof recentApplicants[0] }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
      <Image src={applicant.avatar} alt={applicant.name} width={40} height={40} className="rounded-full" />
      <div className="flex-1">
          <p className="font-semibold text-sm">{applicant.name}</p>
          <p className="text-xs text-muted-foreground">{applicant.role}</p>
      </div>
      <Badge className={`${applicant.match > 85 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{applicant.match}% Match</Badge>
  </div>
);

const JobPerformanceCard = ({ job }: { job: typeof jobPerformance[0] }) => (
    <div className="p-3 border rounded-lg flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
        <div>
            <p className="font-semibold">{job.title}</p>
            <Badge variant={job.status === 'Active' ? 'default' : 'secondary'} className={job.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>{job.status}</Badge>
        </div>
        <div className="hidden md:flex gap-6 text-center">
            <div><p className="font-bold">{job.applicants}</p><p className="text-xs text-muted-foreground">Applicants</p></div>
            <div><p className="font-bold">{job.views}</p><p className="text-xs text-muted-foreground">Views</p></div>
            <div><p className="font-bold">{job.shortlisted}</p><p className="text-xs text-muted-foreground">Shortlisted</p></div>
        </div>
        <Button variant="outline" size="sm">Analytics</Button>
    </div>
);


// --- Main Page Component ---
export default function EmployerDashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        
        {/* 1. Header Section */}
        <motion.div variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-2xl text-slate-600">
                            ZK
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">ZekkTech</h1>
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                            </div>
                            <p className="text-sm text-muted-foreground">Trust Score: 92%</p>
                        </div>
                     </div>
                     <div className="w-full md:w-1/3">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-muted-foreground">Profile Completeness</span>
                            <span className="text-xs font-medium text-primary">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                     </div>
                     <div className="flex flex-wrap gap-2 justify-center">
                        <Button asChild size="sm"><Link href="/employer-dashboard/jobs/create"><Briefcase className="w-4 h-4 mr-2" />Post Job</Link></Button>
                        <Button asChild size="sm" variant="outline"><Link href="/employer-dashboard/candidates/ai-finder"><Search className="w-4 h-4 mr-2" />Find Candidates</Link></Button>
                        <Button asChild size="sm" variant="outline"><Link href="/employer-dashboard/company/profile"><Building className="w-4 h-4 mr-2" />Company Profile</Link></Button>
                     </div>
                </CardContent>
            </Card>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">

                {/* 2. Top Analytics Summary */}
                <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {kpiData.slice(0, 6).map(kpi => (
                        <motion.div variants={itemVariants} key={kpi.title}><KpiCard kpi={kpi} /></motion.div>
                    ))}
                </motion.div>

                {/* 4. ATS Pipeline Snapshot */}
                <motion.div variants={itemVariants}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>ATS Pipeline</span>
                                <Button variant="ghost" size="sm">Open ATS <ArrowRight className="w-4 h-4 ml-2" /></Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 md:grid-cols-7 gap-2 text-center">
                            {['Applied', 'Screening', 'Assessment', 'Interview', 'Offer', 'Hired', 'Rejected'].map(stage => (
                                <div key={stage} className="p-2 bg-slate-50 rounded-lg border">
                                    <p className="font-bold text-xl">{(Math.random() * 50).toFixed(0)}</p>
                                    <p className="text-xs text-muted-foreground">{stage}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
                
                {/* 6. Job Performance */}
                <motion.div variants={itemVariants}>
                     <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle>Job Performance</CardTitle>
                            <CardDescription>Overview of your active job postings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {jobPerformance.map(job => (
                                    <JobPerformanceCard key={job.title} job={job}/>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                
            </div>

            <div className="space-y-6">

                {/* 3. AI Hiring Insights */}
                <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-primary/90 to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Sparkles /> AI Hiring Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-primary-foreground/80">"Frontend Developer" JD has a low quality score. Improve it to attract 40% more applicants.</p>
                            <Button variant="secondary" size="sm" className="w-full">Improve with AI</Button>
                            <p className="text-sm text-primary-foreground/80 pt-2 border-t border-primary-foreground/20">Skill gap found: 60% of applicants lack TypeScript experience.</p>
                             <Button variant="secondary" size="sm" className="w-full">Find TypeScript Candidates</Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 5. Recent Applicants */}
                <motion.div variants={itemVariants}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle>Recent Applicants</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentApplicants.map(applicant => (
                               <ApplicantCard key={applicant.name} applicant={applicant} />
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 8. Verification Status */}
                <motion.div variants={itemVariants}>
                     <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle>Verification Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600"><ShieldCheck className="w-5 h-5"/> <span className="font-semibold">KYC Verified</span></div>
                            <p className="text-sm text-muted-foreground">Your company profile is trusted. To increase your Trust Score, add employee testimonials.</p>
                            <Button asChild variant="outline" size="sm" className="w-full"><Link href="/employer-dashboard/branding">Improve Employer Branding</Link></Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 11. Support Cards */}
                <motion.div variants={itemVariants}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader><CardTitle>Support</CardTitle></CardHeader>
                        <CardContent className="flex flex-col gap-2">
                             <Button asChild variant="ghost" className="justify-start gap-2"><Link href="/employer-dashboard/support"><HelpCircle className="w-4 h-4" /> Help Center</Link></Button>
                             <Button asChild variant="ghost" className="justify-start gap-2"><Link href="/employer-dashboard/support"><MessageSquare className="w-4 h-4" /> Raise a Ticket</Link></Button>
                        </CardContent>
                    </Card>
                </motion.div>

            </div>
        </div>

      </motion.div>
    </div>
  );
}
