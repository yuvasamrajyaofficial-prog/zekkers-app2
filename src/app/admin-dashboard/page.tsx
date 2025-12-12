'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, ShieldCheck, HeartPulse, AlertCircle, TrendingUp } from 'lucide-react';

const kpiData = [
  { title: 'Active Users (30d)', value: '1,254', icon: <Users className="w-6 h-6 text-blue-500" />, change: '+5.2%', changeType: 'increase' },
  { title: 'Jobs Posted', value: '4,821', icon: <Briefcase className="w-6 h-6 text-green-500" />, change: '+12%', changeType: 'increase' },
  { title: 'Pending Verifications', value: '18', icon: <ShieldCheck className="w-6 h-6 text-amber-500" />, change: '-3', changeType: 'decrease' },
  { title: 'System Status', value: 'Operational', icon: <HeartPulse className="w-6 h-6 text-green-500" />, change: '99.98% Uptime', changeType: 'neutral' },
  { title: 'Moderation Queue', value: '42', icon: <AlertCircle className="w-6 h-6 text-red-500" />, change: '+8 today', changeType: 'increase' },
  { title: 'Placement Rate', value: '18%', icon: <TrendingUp className="w-6 h-6 text-indigo-500" />, change: '+0.5% MoM', changeType: 'increase' },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Global Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg hover:-translate-y-1 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpi.value}</div>
              <p className={`text-xs mt-1 ${kpi.changeType === 'increase' ? 'text-green-600' : kpi.changeType === 'decrease' ? 'text-red-600' : 'text-slate-500'}`}>
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
             <p className="text-slate-500">Activity feed is under construction.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
