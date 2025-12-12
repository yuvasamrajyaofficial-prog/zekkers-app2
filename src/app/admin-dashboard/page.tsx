'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Briefcase, ShieldCheck, HeartPulse, AlertCircle, TrendingUp, Activity, DollarSign, UserPlus } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

const kpiData = [
  { title: 'Total Revenue', value: '$45,231.89', icon: <DollarSign className="w-4 h-4 text-muted-foreground" />, change: '+20.1% from last month', changeType: 'increase' },
  { title: 'Subscriptions', value: '+2350', icon: <Users className="w-4 h-4 text-muted-foreground" />, change: '+180.1% from last month', changeType: 'increase' },
  { title: 'Active Jobs', value: '+12,234', icon: <Briefcase className="w-4 h-4 text-muted-foreground" />, change: '+19% from last month', changeType: 'increase' },
  { title: 'Active Now', value: '+573', icon: <Activity className="w-4 h-4 text-muted-foreground" />, change: '+201 since last hour', changeType: 'increase' },
];

const userGrowthData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 3200 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4200 },
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const recentActivity = [
  {
    user: {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: '/avatars/01.png',
    },
    amount: '+$1,999.00',
    status: 'New Subscription',
  },
  {
    user: {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: '/avatars/02.png',
    },
    amount: '+$39.00',
    status: 'Job Posting',
  },
  {
    user: {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: '/avatars/03.png',
    },
    amount: '+$299.00',
    status: 'Verified Badge',
  },
  {
    user: {
      name: 'William Kim',
      email: 'will@email.com',
      avatar: '/avatars/04.png',
    },
    amount: '+$99.00',
    status: 'Resume AI',
  },
  {
    user: {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      avatar: '/avatars/05.png',
    },
    amount: '+$39.00',
    status: 'Job Posting',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">
                      {item.user.name.charAt(0)}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.user.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* User Growth Chart */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7">
            <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
