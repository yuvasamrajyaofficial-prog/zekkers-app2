
'use client';
import React from 'react';
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
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Download,
  Sparkles,
  Lightbulb,
  ThumbsDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  LabelList,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
} from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const kpiData = [
  { title: 'Active Jobs', value: '12', trend: '+2', trendType: 'increase', icon: <Briefcase /> },
  { title: 'New Applicants', value: '48', trend: '+15 today', trendType: 'increase', icon: <Users /> },
  { title: 'Shortlisted', value: '22', trend: '-3', trendType: 'decrease', icon: <UserCheck /> },
  { title: 'Interviews Scheduled', value: '8', trend: '+4', trendType: 'increase', icon: <Calendar /> },
  { title: 'Offers Released', value: '3', trend: 'steady', trendType: 'neutral', icon: <FileText /> },
  { title: 'Avg. Time-to-Hire', value: '28 days', trend: '-2d', trendType: 'decrease', icon: <Clock /> },
];

const hiringFunnelData = [
  { stage: 'Views', value: 4500, conversion: 100 },
  { stage: 'Applies', value: 210, conversion: 4.6 },
  { stage: 'Screened', value: 150, conversion: 71.4 },
  { stage: 'Shortlisted', value: 45, conversion: 30 },
  { stage: 'Interview', value: 22, conversion: 48.8 },
  { stage: 'Offer', value: 8, conversion: 36.3 },
  { stage: 'Hired', value: 3, conversion: 37.5 },
];

const recruiterProductivityData = [
    { name: 'Anjali', workload: 8, productivity: 9 },
    { name: 'Rohit', workload: 5, productivity: 7 },
    { name: 'Priya', workload: 9, productivity: 6 },
    { name: 'Sameer', workload: 4, productivity: 4 },
];

const candidateJourneyData = [
    { stage: 'Viewed Job', value: 100 },
    { stage: 'Started Application', value: 40 },
    { stage: 'Completed Resume Section', value: 35 },
    { stage: 'Submitted', value: 30 },
];

const deiFunnelData = [
    { stage: 'Applied', male: 120, female: 90 },
    { stage: 'Shortlisted', male: 25, female: 20 },
    { stage: 'Hired', male: 2, female: 1 },
];

const KpiCard = ({ kpi }: { kpi: typeof kpiData[0] }) => {
    const trendColor = kpi.trendType === 'increase' ? 'text-green-600' : kpi.trendType === 'decrease' ? 'text-red-600' : 'text-slate-500';
    const TrendIcon = kpi.trendType === 'increase' ? TrendingUp : TrendingDown;
    return (
        <Card className="hover:shadow-md transition-shadow">
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

export default function EmployerAnalyticsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-1">
            Track your hiring funnel, job performance, and team metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Select defaultValue="30d">
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
            </Select>
          <Button variant="outline" className="gap-2">
            <Download size={16} /> Export Summary
          </Button>
        </div>
      </div>
      
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-6 space-y-6">
        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiData.map(kpi => (
                <motion.div variants={itemVariants} key={kpi.title}><KpiCard kpi={kpi} /></motion.div>
            ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Hiring Funnel</CardTitle>
                        <CardDescription>Conversion rates from views to hires.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={hiringFunnelData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" width={80} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="value" position="right" className="fill-foreground" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
             <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Time to Hire</CardTitle>
                         <CardDescription>Median days from application to offer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={[{name: 'Jan', days: 35}, {name: 'Feb', days: 32}, {name: 'Mar', days: 28}, {name: 'Apr', days: 26}]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Line type="monotone" dataKey="days" stroke="hsl(var(--primary))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>

        {/* --- Advanced Analytics Modules --- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Job Post Quality Score (AI)</CardTitle>
                        <CardDescription>Frontend Developer @ ZekkTech</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <div className="text-6xl font-bold text-amber-500">72<span className="text-2xl text-muted-foreground">/100</span></div>
                            <p className="text-sm font-semibold mt-1">Good, but could be better.</p>
                        </div>
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-start gap-2"><Lightbulb className="w-4 h-4 mt-1 text-green-500"/> <span>Clear and concise role description.</span></div>
                            <div className="flex items-start gap-2"><ThumbsDown className="w-4 h-4 mt-1 text-red-500"/> <span>Salary range is 15% below market average for Bengaluru.</span></div>
                            <div className="flex items-start gap-2"><ThumbsDown className="w-4 h-4 mt-1 text-red-500"/> <span>Missing details on company benefits.</span></div>
                        </div>
                         <Button className="w-full mt-4">Improve with AI</Button>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recruiter Productivity Matrix</CardTitle>
                        <CardDescription>Workload vs. Hires - Last 30 Days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="workload" name="Workload" unit=" jobs" />
                                <YAxis type="number" dataKey="productivity" name="Productivity" unit=" hires" />
                                <ZAxis type="category" dataKey="name" name="Recruiter" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Legend />
                                <Scatter name="Recruiters" data={recruiterProductivityData} fill="hsl(var(--primary))" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
        
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Candidate Journey Analytics</CardTitle>
                        <CardDescription>Drop-off points for the "Frontend Developer" role.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={candidateJourneyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]}>
                                     <LabelList dataKey="value" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>DEI Overview</CardTitle>
                        <CardDescription>Gender Diversity Funnel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                           <BarChart data={deiFunnelData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Legend />
                                <Bar dataKey="male" stackId="a" fill="hsl(var(--chart-2))" name="Male" />
                                <Bar dataKey="female" stackId="a" fill="hsl(var(--chart-5))" name="Female" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>


      </motion.div>
    </div>
  );
}
