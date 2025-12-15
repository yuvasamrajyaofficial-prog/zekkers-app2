
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
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  Briefcase,
  Globe,
  Clock,
  Sparkles,
  Map,
  ShieldCheck,
  Plane,
  TrendingUp,
  GitBranch,
  FileText,
  CheckCircle,
  XCircle,
  BarChart as BarChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useAuth } from '@/context/auth-context';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Mock Data ---
const kpiData = [
  { title: 'Total Applicants', value: '18,450', icon: <Users /> },
  { title: 'Active Jobs', value: '72', icon: <Briefcase /> },
  { title: 'Countries Hiring In', value: '12', icon: <Globe /> },
  { title: 'Avg. Time to Hire', value: '32 days', icon: <Clock /> },
  { title: 'Visa-Ready Candidates', value: '2,830', icon: <FileText /> },
  { title: 'Offer Acceptance Rate', value: '88%', icon: <TrendingUp /> },
];

const activeJobs = [
    { id: 'job1', title: 'Senior Cloud Engineer', country: 'Germany', applicants: 152, status: 'Active' },
    { id: 'job2', title: 'Marketing Lead, APAC', country: 'Singapore', applicants: 88, status: 'Active' },
    { id: 'job3', title: 'Lead Data Scientist', country: 'USA (Remote)', applicants: 210, status: 'Interviewing' },
];

const visaStatusData = [
    { name: 'Visa-Ready', value: 2830, color: 'hsl(var(--chart-1))' },
    { name: 'Needs Sponsorship', value: 950, color: 'hsl(var(--chart-2))' },
    { name: 'In Progress', value: 310, color: 'hsl(var(--chart-5))' },
];

const recruiterActivity = [
    { name: 'John Doe (USA)', action: 'shortlisted 5 candidates for Data Scientist.', time: '2h ago' },
    { name: 'Priya Sharma (India)', action: 'posted a new job: "DevOps Engineer".', time: '5h ago' },
    { name: 'Hans Müller (Germany)', action: 'sent 2 offers for Cloud Engineer.', time: '8h ago' },
];

// --- Sub-Components ---
const KpiCard = ({ kpi }: { kpi: typeof kpiData[0] }) => (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <div className="text-muted-foreground">{kpi.icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
        </CardContent>
    </Card>
);

const Section = ({ title, icon, children, action }: { title: string, icon: React.ReactNode, children: React.ReactNode, action?: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-lg">{icon}{title}</CardTitle>
                {action}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </motion.div>
);


// --- Main Component ---
export default function GlobalEmployersDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-slate-800">Global Hiring Overview</h1>
            <p className="text-slate-500 mt-1">Welcome back, {user?.displayName || 'Global Partner'}. Here is your international talent command center.</p>
        </motion.div>

        {/* KPIs */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiData.map((kpi) => (
            <motion.div variants={itemVariants} key={kpi.title} className="h-full"><KpiCard kpi={kpi} /></motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Global Hiring Heatmap" icon={<Map />}>
              <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-sm">[Interactive World Map Placeholder]</p>
              </div>
            </Section>
            
            <Section title="Active Job Snapshot" icon={<Briefcase />} action={<Button variant="outline" size="sm">Manage All Jobs</Button>}>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activeJobs.map(job => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.country}</TableCell>
                            <TableCell>{job.applicants}</TableCell>
                            <TableCell><Badge variant="secondary">{job.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Section>
            
            <Section title="Global Applicant Pipeline" icon={<GitBranch />} action={<Button variant="outline" size="sm">Open Full ATS</Button>}>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
                    {['Applied', 'Screening', 'Interview', 'Assignment', 'Offer', 'Hired'].map(stage => (
                        <div key={stage} className="p-2 bg-slate-100 rounded-md">
                            <p className="font-bold text-lg">{(Math.random()*100).toFixed(0)}</p>
                            <p className="text-muted-foreground">{stage}</p>
                        </div>
                    ))}
                </div>
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
             <Section title="AI Talent Insights" icon={<Sparkles />}>
                <div className="space-y-3 text-sm">
                    <p>⚡️ <strong>Fastest Hiring:</strong> Germany (Avg. 28 days)</p>
                    <p>📈 <strong>High-Supply:</strong> 500+ visa-ready Java developers in India.</p>
                    <p>💡 <strong>Suggestion:</strong> Increase salary for "Data Scientist" in USA by 8% to be competitive.</p>
                </div>
            </Section>

            <Section title="Visa & Relocation" icon={<Plane />}>
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie data={visaStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5}>
                             {visaStatusData.map((entry, index) => <Cell key={entry.name} fill={`hsl(var(--chart-${index + 1}))`} />)}
                        </Pie>
                         <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                         <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right"/>
                    </PieChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Compliance Status" icon={<ShieldCheck />}>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><CheckCircle className="text-green-500 w-4 h-4"/> Germany: All clear</div>
                <div className="flex items-center gap-2"><CheckCircle className="text-green-500 w-4 h-4"/> Singapore: All clear</div>
                <div className="flex items-center gap-2"><XCircle className="text-red-500 w-4 h-4"/> USA: H1-B registration ending soon</div>
              </div>
            </Section>

             <Section title="Recruiter Activity" icon={<Users />}>
                <div className="space-y-3 text-sm">
                    {recruiterActivity.map((act, i) => (
                        <div key={i} className="flex gap-2">
                            <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"/>
                            <p><span className="font-semibold">{act.name}</span> {act.action} <span className="text-muted-foreground">{act.time}</span></p>
                        </div>
                    ))}
                </div>
            </Section>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
