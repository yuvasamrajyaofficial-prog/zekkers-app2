
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
  Users,
  CheckCircle,
  TrendingUp,
  HeartHandshake,
  Download,
  Lightbulb,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const kpiData = [
  { title: 'Total Beneficiaries', value: '1,250', icon: <Users />, trend: '+15% MoM' },
  { title: 'Placements This Year', value: '480', icon: <TrendingUp />, trend: '+8% MoM' },
  { title: 'Certifications Issued', value: '980', icon: <CheckCircle />, trend: '+22% MoM' },
  { title: 'Active Programs', value: '12', icon: <HeartHandshake />, trend: '+2 this quarter' },
];

const programPerformance = [
  { name: 'Digital Literacy', completion: 92, placement: 65 },
  { name: 'Retail Skills', completion: 85, placement: 78 },
  { name: 'IT Support', completion: 88, placement: 82 },
  { name: 'Hospitality', completion: 78, placement: 70 },
];

const genderData = [
    { name: 'Female', value: 750, color: 'hsl(var(--chart-1))' },
    { name: 'Male', value: 500, color: 'hsl(var(--chart-2))' },
];

const activityFeed = [
    { id: 1, text: 'Riya Sharma completed the Digital Literacy program.', time: '2h ago' },
    { id: 2, text: 'A new partnership with ZekkTech has been established.', time: '1d ago' },
    { id: 3, text: '5 beneficiaries were placed at GlobalSoft Inc.', time: '2d ago' },
];

const KpiCard = ({ kpi }: { kpi: typeof kpiData[0] }) => (
    <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <div className="text-primary">{kpi.icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{kpi.value}</div>
            <p className="text-xs text-green-600 mt-1">{kpi.trend}</p>
        </CardContent>
    </Card>
);

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
                 <h1 className="text-3xl font-bold text-slate-800">
                    Impact Analytics
                </h1>
                <p className="text-slate-500 mt-1">
                    Measure and visualize your organization's social impact.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                 <Select defaultValue="30d">
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                        <SelectItem value="90d">Last Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto gap-2"><Download size={16}/> Export Summary</Button>
            </div>
        </div>

        {/* KPI Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {kpiData.map((kpi) => (
            <motion.div variants={itemVariants} key={kpi.title}><KpiCard kpi={kpi} /></motion.div>
          ))}
        </motion.div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Program Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart data={programPerformance}>
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                                <Legend />
                                <Bar dataKey="completion" name="Completion Rate (%)" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="placement" name="Placement Rate (%)" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Beneficiary Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {genderData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
         {/* AI Insights & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="h-full bg-primary/90 text-primary-foreground">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb /> AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       <p className="text-sm text-primary-foreground/80">"Retail Skills" program shows the highest placement conversion rate (78%).</p>
                       <Button variant="secondary" size="sm" className="w-full mt-2">View Detailed Analysis</Button>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Real-time Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            {activityFeed.map(item => (
                                <div key={item.id} className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                        <CheckCircle size={16} className="text-slate-500" />
                                    </div>
                                    <p className="flex-1">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                            ))}
                         </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
