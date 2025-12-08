'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Briefcase, ShieldCheck, UserCheck, HeartPulse, AlertCircle, TrendingUp, BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const kpiData = [
  { title: 'Total Users', value: '12,254', icon: <Users className="w-5 h-5 text-blue-500" /> },
  { title: 'Total Employers', value: '821', icon: <Briefcase className="w-5 h-5 text-green-500" /> },
  { title: 'Pending Verifications', value: '18', icon: <ShieldCheck className="w-5 h-5 text-amber-500" /> },
  { title: 'Active Jobs', value: '4,821', icon: <Briefcase className="w-5 h-5 text-indigo-500" />},
  { title: 'Fraud Alerts', value: '3', icon: <AlertCircle className="w-5 h-5 text-red-500" />},
  { title: 'System Uptime', value: '99.98%', icon: <HeartPulse className="w-5 h-5 text-green-500" /> },
];

const dailyUsers = [
    {date: '01/07', users: 400},
    {date: '02/07', users: 420},
    {date: '03/07', users: 450},
    {date: '04/07', users: 430},
    {date: '05/07', users: 480},
    {date: '06/07', users: 510},
    {date: '07/07', users: 530},
];

const userRoles = [
    { name: 'Students', value: 9500, color: 'hsl(var(--chart-1))'},
    { name: 'Employers', value: 821, color: 'hsl(var(--chart-2))'},
    { name: 'Admins', value: 15, color: 'hsl(var(--chart-3))'},
    { name: 'NGOs', value: 45, color: 'hsl(var(--chart-4))'},
];

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Platform Analytics</h1>
      
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiData.map(kpi => (
                <motion.div variants={itemVariants} key={kpi.title}><StatCard {...kpi} /></motion.div>
            ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LineChartIcon size={18}/> Daily Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dailyUsers}>
                                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PieChartIcon size={18}/> User Role Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={userRoles} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {userRoles.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
