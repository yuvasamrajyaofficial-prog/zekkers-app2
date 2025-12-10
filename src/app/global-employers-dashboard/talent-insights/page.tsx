
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
  Users,
  Briefcase,
  Globe,
  Clock,
  Sparkles,
  Map,
  ShieldCheck,
  Plane,
  TrendingUp,
  FileText,
  Download,
  Filter,
  BarChart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AlertCircle,
  Lightbulb,
  DollarSign,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from 'recharts';

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
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Mock Data ---
const hiringDifficultyData = [
    { country: 'Germany', index: 65, level: 'Moderate' },
    { country: 'India', index: 45, level: 'Easy' },
    { country: 'USA', index: 80, level: 'Challenging' },
    { country: 'Singapore', index: 92, level: 'Critical' },
];

const diversityData = [
    { name: 'Female', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Male', value: 52, color: 'hsl(var(--chart-2))' },
    { name: 'Other', value: 3, color: 'hsl(var(--chart-3))'},
];

// --- Sub-Components ---
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

const DifficultyIndicator = ({ level }: { level: string }) => {
    const colors: {[key: string]: string} = {
        Easy: 'bg-green-500',
        Moderate: 'bg-yellow-500',
        Challenging: 'bg-orange-500',
        Critical: 'bg-red-500',
    };
    return <div className={`w-3 h-3 rounded-full ${colors[level]}`}></div>;
}


// --- Main Component ---
export default function TalentInsightsPage() {
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Global Talent Insights</h1>
              <p className="text-slate-500 mt-1">AI-powered market intelligence for strategic hiring decisions.</p>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2"><Filter size={16}/> Filters</Button>
                <Button className="gap-2"><Download size={16}/> Export Full Report</Button>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Global Skill Availability Heatmap" icon={<Map />}>
              <div className="h-80 bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-sm">[Interactive World Map Placeholder]</p>
              </div>
            </Section>

            <Section title="Global Hiring Difficulty Index" icon={<TrendingUp />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {hiringDifficultyData.map(d => (
                        <Card key={d.country}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{d.country}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{d.index}/100</div>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <DifficultyIndicator level={d.level}/> {d.level}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

             <Section title="Global Salary Intelligence" icon={<DollarSign />}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select><SelectTrigger><SelectValue placeholder="Select Country..."/></SelectTrigger><SelectContent><SelectItem value="india">India</SelectItem></SelectContent></Select>
                    <Select><SelectTrigger><SelectValue placeholder="Select Role..."/></SelectTrigger><SelectContent><SelectItem value="swe">Software Engineer</SelectItem></SelectContent></Select>
                    <Select><SelectTrigger><SelectValue placeholder="Select Experience..."/></SelectTrigger><SelectContent><SelectItem value="mid">3-5 years</SelectItem></SelectContent></Select>
                </div>
                <div className="mt-4 p-4 bg-slate-100 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Recommended Salary (Bengaluru)</p>
                    <p className="text-3xl font-bold text-primary">₹18 - ₹25 LPA</p>
                    <p className="text-xs text-green-600 font-semibold">Competitive (85th Percentile)</p>
                </div>
            </Section>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6">
            <Section title="AI Market Forecasting (6M)" icon={<Sparkles />}>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                         <RechartsLineChart data={[{name: 'Jan', demand: 4000}, {name: 'Mar', demand: 4500}, {name: 'May', demand: 4200}, {name: 'Jul', demand: 4800}]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                            <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                            <Line type="monotone" dataKey="demand" name="Talent Demand" stroke="hsl(var(--primary))" />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">AI predicts a 15% rise in demand for Cloud Engineers in APAC.</p>
            </Section>

             <Section title="Diversity & Inclusion Index" icon={<PieChartIcon />}>
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                            <Pie data={diversityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                 {diversityData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                            </Pie>
                             <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                             <Legend iconSize={10} />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </div>
            </Section>
            
            <Section title="Visa & Relocation Insights" icon={<Plane />}>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground">Visa-Ready Pool</span><strong className="font-bold">2,830</strong></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground">Avg. Processing Time</span><strong className="font-bold">45 Days</strong></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-muted-foreground">Top Fast-Track Country</span><strong className="font-bold">Germany</strong></div>
                </div>
            </Section>
            
             <Section title="AI Skill Gap Alert" icon={<AlertCircle className="text-amber-500"/>}>
                <p className="text-sm">Your "Senior DevOps" roles have a <strong>45% skill mismatch</strong> with the current talent pool in Europe. Consider adding "Terraform" as a required skill.</p>
                <Button variant="outline" size="sm" className="mt-3 gap-2"><Lightbulb size={14}/>Get AI Suggestions</Button>
            </Section>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
