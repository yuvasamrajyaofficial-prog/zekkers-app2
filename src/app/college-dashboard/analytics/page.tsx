'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PieChart as PieChartIcon,
  Pie,
  Cell,
  LineChart as LineChartIcon,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as BarChartIcon,
  Bar,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Globe,
  Activity,
  Briefcase,
} from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const mockStats = {
  totalStudents: 12450,
  totalEmployers: 830,
  totalJobs: 15230,
  avgMatchScore: 78,
  activeCountries: 54,
};

const mockLine = [
  { month: 'Jan', hires: 200 },
  { month: 'Feb', hires: 240 },
  { month: 'Mar', hires: 360 },
  { month: 'Apr', hires: 400 },
  { month: 'May', hires: 380 },
  { month: 'Jun', hires: 450 },
];

const mockBar = [
  { role: 'Frontend Dev', count: 120 },
  { role: 'Backend Dev', count: 90 },
  { role: 'Data Analyst', count: 75 },
  { role: 'Product Manager', count: 65 },
  { role: 'Govt Clerk', count: 150 },
];

const mockPie = [
  { name: 'Govt', value: 300 },
  { name: 'Private', value: 500 },
  { name: 'International', value: 200 },
];

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
}> = ({ icon, label, value }) => (
  <motion.div variants={itemVariants}>
    <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
  </motion.div>
);

export default function AnalyticsInsightsPage() {
  return (
    <div className="p-6">
       <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
            <h1 className="text-2xl font-bold">Analytics & Insights</h1>
            <p className="text-sm text-slate-500">
                AI-powered dashboards to track students, employers, jobs, and hiring outcomes.
            </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          <StatCard icon={<Users className="w-4 h-4 text-muted-foreground" />} label="Total Students" value={mockStats.totalStudents.toLocaleString()} />
          <StatCard icon={<Users className="w-4 h-4 text-muted-foreground" />} label="Partner Employers" value={mockStats.totalEmployers} />
          <StatCard icon={<Briefcase className="w-4 h-4 text-muted-foreground" />} label="Total Jobs Posted" value={mockStats.totalJobs.toLocaleString()} />
          <StatCard icon={<Globe className="w-4 h-4 text-muted-foreground" />} label="Countries Active" value={mockStats.activeCountries} />
          <StatCard icon={<Activity className="w-4 h-4 text-muted-foreground" />} label="Avg Match Score" value={mockStats.avgMatchScore + '%'} />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Hiring Trend */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Hiring Trends (Monthly)</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChartIcon data={mockLine}>
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius-lg)",
                            }}
                        />
                        <Line type="monotone" dataKey="hires" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))" }} activeDot={{ r: 8, fill: "hsl(var(--primary))" }} />
                        </LineChartIcon>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
          </motion.div>

          {/* Jobs by Category Pie Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Jobs by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChartIcon>
                            <Pie data={mockPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {mockPie.map((_, i) => <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />)}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius-lg)",
                                }}
                            />
                            <Legend />
                        </PieChartIcon>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
          </motion.div>
        </div>

         {/* Top Roles */}
        <motion.div variants={itemVariants}>
            <Card>
                <CardHeader>
                    <CardTitle>Top Roles by Demand</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChartIcon data={mockBar}>
                        <XAxis dataKey="role" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius-lg)",
                            }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                        </BarChartIcon>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </motion.div>

        {/* AI Insights Section */}
        <motion.div variants={itemVariants}>
            <Card>
                <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="mt-4 text-sm text-slate-600 space-y-2">
                    <li>• AI predicts next 30 days hiring surge in Technology & Finance roles.</li>
                    <li>• Students with match score above 80% get hired 3.2× faster.</li>
                    <li>• Global remote jobs up by 27% this quarter.</li>
                    <li>• Employers with trust score above 90 hire 42% more candidates.</li>
                    <li>• Most demanded skill this month: Full-stack + Cloud.</li>
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
