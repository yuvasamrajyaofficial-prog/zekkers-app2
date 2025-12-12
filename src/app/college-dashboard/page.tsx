
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Briefcase,
  TrendingUp,
  Building,
  Calendar,
  UserCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

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

const kpiData = [
  {
    title: 'Total Students',
    value: '2,450',
    icon: <Users className="w-6 h-6 text-blue-500" />,
    change: '+10% YoY',
    changeType: 'increase',
  },
  {
    title: 'Total Placements',
    value: '680',
    icon: <Briefcase className="w-6 h-6 text-green-500" />,
    change: '+15% YoY',
    changeType: 'increase',
  },
  {
    title: 'Avg. Salary',
    value: '₹6.2 LPA',
    icon: <TrendingUp className="w-6 h-6 text-indigo-500" />,
    change: '+8% YoY',
    changeType: 'increase',
  },
  {
    title: 'Active Recruiters',
    value: '85',
    icon: <Building className="w-6 h-6 text-amber-500" />,
    change: '+5 this month',
    changeType: 'increase',
  },
  {
    title: 'Scheduled Drives',
    value: '12',
    icon: <Calendar className="w-6 h-6 text-purple-500" />,
    change: '3 upcoming',
    changeType: 'neutral',
  },
  {
    title: 'Profile Completion',
    value: '88%',
    icon: <UserCheck className="w-6 h-6 text-cyan-500" />,
    change: 'Target: 95%',
    changeType: 'neutral',
  },
];

const placementData = [
    { name: 'CSE', placed: 180, total: 240 },
    { name: 'ECE', placed: 150, total: 220 },
    { name: 'MECH', placed: 120, total: 200 },
    { name: 'CIVIL', placed: 90, total: 180 },
    { name: 'EEE', placed: 140, total: 210 },
]

const resumeData = [
  { name: 'Completed', value: 2156 },
  { name: 'Incomplete', value: 294 },
];
const COLORS = ['#FFC107', '#EF4444'];


export default function CollegeDashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, ABC University
          </h1>
          <p className="text-slate-500 mt-1">
            Here's a real-time overview of your placement activities.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {kpiData.map((kpi, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  {kpi.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{kpi.value}</div>
                  <p
                    className={`text-xs mt-1 ${
                      kpi.changeType === 'increase'
                        ? 'text-green-600'
                        : kpi.changeType === 'decrease'
                        ? 'text-red-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {kpi.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Placement by Department */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Placements by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={placementData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="placed" stackId="a" fill="#FFC107" name="Placed" />
                                <Bar dataKey="total" fill="#EF4444" name="Total Students" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                 </Card>
            </motion.div>
             {/* Resume Completion */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Student Readiness</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                           <PieChart>
                                <Pie
                                    data={resumeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {resumeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
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
