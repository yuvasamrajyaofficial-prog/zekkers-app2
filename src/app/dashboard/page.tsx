'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  TrendingUp, 
  Eye, 
  Search, 
  User, 
  ArrowRight, 
  MapPin,
  Building2,
  Clock,
  Calendar
} from 'lucide-react';
import ChatWindow from './_components/ChatWindow';

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.displayName?.split(' ')[0] || 'Student';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Mock Data
  const stats = [
    { label: 'Jobs Applied', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Profile Views', value: '48', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Interviews', value: '3', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Response Rate', value: '25%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp Inc.', location: 'Bangalore, Remote', type: 'Full-time', salary: '₹12-18 LPA', posted: '2 days ago', logo: 'TC' },
    { id: 2, title: 'UX Designer', company: 'Creative Studio', location: 'Mumbai, On-site', type: 'Contract', salary: '₹8-12 LPA', posted: '5 hours ago', logo: 'CS' },
    { id: 3, title: 'React Native Intern', company: 'Appify', location: 'Delhi, Hybrid', type: 'Internship', salary: '₹15k/mo', posted: '1 day ago', logo: 'AP' },
  ];

  const recentActivity = [
    { id: 1, action: 'Applied to Backend Engineer', company: 'FinTech Solutions', time: '2 hours ago' },
    { id: 2, action: 'Profile viewed by Recruiter', company: 'Global Systems', time: '5 hours ago' },
    { id: 3, action: 'Updated Resume', company: '', time: 'Yesterday' },
  ];

  return (
    <div className="min-h-full w-full bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Hello, {userName}! 👋</h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">Here's what's happening with your job search today, {today}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/jobs">
              <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800 w-full sm:w-auto">
                <Search className="w-4 h-4" />
                Find Jobs
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <User className="w-4 h-4" />
                Update Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
              <CardContent className="p-2 md:p-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-1 md:gap-0 text-center md:text-left h-full">
                <div className="order-2 md:order-1">
                  <p className="hidden md:block text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-slate-900 mt-0 md:mt-1 truncate w-full">{stat.value}</h3>
                  <p className="md:hidden text-[10px] text-slate-400 leading-tight truncate w-full px-1">{stat.label}</p>
                </div>
                <div className={`p-1.5 md:p-3 rounded-lg md:rounded-xl ${stat.bg} order-1 md:order-2 mb-1 md:mb-0`}>
                  <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Recommended Jobs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
              <Link href="/dashboard/jobs" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <Card key={job.id} className="group hover:border-primary/50 transition-colors cursor-pointer bg-white border-slate-200">
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-lg shrink-0">
                      {job.logo}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-slate-500 text-sm">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0">
                          {job.type}
                        </Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Column: Activity & Shortcuts */}
          <div className="space-y-6">
            
            {/* Recent Activity */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3 relative">
                      {index !== recentActivity.length - 1 && (
                        <div className="absolute left-[11px] top-8 bottom-[-24px] w-[2px] bg-slate-100" />
                      )}
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        {activity.company && <p className="text-xs text-slate-500">{activity.company}</p>}
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
              <CardHeader>
                <CardTitle className="text-lg text-white">Boost Your Profile</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete your profile to appear in 3x more searches.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Profile Completion</span>
                  <span className="font-bold text-yellow-400">65%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[65%]" />
                </div>
                <Link href="/dashboard/profile" className="block pt-2">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                    Complete Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </div>
        </div>
        
        {/* AI Assistant / Chat Window */}
        <div className="mt-8">
           <h2 className="text-xl font-bold text-slate-900 mb-4">AI Career Assistant</h2>
           <div className="h-[500px] border rounded-xl overflow-hidden bg-white shadow-sm">
              <ChatWindow />
           </div>
        </div>

      </div>
    </div>
  );
}
