'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, FileText, DollarSign, Activity, UserPlus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardHome() {
  // Mock Data for Stats
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12% from last month',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Active Jobs',
      value: '543',
      change: '+5% from last month',
      icon: Briefcase,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Total Applications',
      value: '45,231',
      change: '+18% from last month',
      icon: FileText,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Revenue (YTD)',
      value: '$124,500',
      change: '+8% from last month',
      icon: DollarSign,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
  ];

  // Mock Data for Recent Activity
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'registered as a Student',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'text-blue-500',
    },
    {
      id: 2,
      user: 'TechCorp Inc.',
      action: 'posted a new job: Senior React Dev',
      time: '15 minutes ago',
      icon: Briefcase,
      color: 'text-green-500',
    },
    {
      id: 3,
      user: 'System',
      action: 'Flagged suspicious activity from IP 192.168.1.1',
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'text-red-500',
    },
    {
      id: 4,
      user: 'Sarah Smith',
      action: 'verified their email address',
      time: '2 hours ago',
      icon: UserPlus,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-slate-500">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center">
                            <div className={`mr-4 rounded-full p-2 bg-slate-100 ${activity.color}`}>
                                <activity.icon className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none text-slate-900">
                                    <span className="font-bold">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Pending Actions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                        <div>
                            <div className="font-semibold text-yellow-900">5 New Employer Verifications</div>
                            <div className="text-xs text-yellow-700">Pending review for over 24 hours</div>
                        </div>
                        <button className="px-3 py-1.5 text-xs font-medium bg-white text-yellow-700 border border-yellow-200 rounded-md hover:bg-yellow-50">
                            Review
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-100">
                        <div>
                            <div className="font-semibold text-red-900">3 Reported Jobs</div>
                            <div className="text-xs text-red-700">Flagged by users as spam/scam</div>
                        </div>
                        <button className="px-3 py-1.5 text-xs font-medium bg-white text-red-700 border border-red-200 rounded-md hover:bg-red-50">
                            Investigate
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
