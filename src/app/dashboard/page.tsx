'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useFirestore, useUser } from '@/firebase';
import { fetchJobs } from '@/services/jobs';
import { fetchStudentApplications, Application } from '@/services/applications';
import { getUserProfile, ProfileData } from '@/services/profile';
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
  Calendar,
  CheckCircle2
} from 'lucide-react';
import ChatWindow from './_components/ChatWindow';
import ZLoader from '@/components/ui/loader';

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const userName = user?.displayName?.split(' ')[0] || 'Student';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const [recommendedJobs, setRecommendedJobs] = React.useState<any[]>([]);
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [userProfile, setUserProfile] = React.useState<ProfileData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadDashboardData = async () => {
        if (!firestore || !user) return;
        setLoading(true);
        try {
            // Parallel data fetching
            const [jobs, apps, profile] = await Promise.all([
                fetchJobs(firestore, 'all'),
                fetchStudentApplications(firestore, user.uid),
                getUserProfile(firestore, user.uid)
            ]);

            // Process Jobs
            setRecommendedJobs(jobs.slice(0, 3).map(job => ({
                id: job.id,
                title: job.title,
                company: job.company,
                location: job.location,
                type: job.type,
                salary: job.salaryMin ? `${job.currency} ${job.salaryMin/100000} LPA` : 'Not disclosed',
                posted: job.postedAt ? new Date(job.postedAt.seconds * 1000 || job.postedAt).toLocaleDateString() : 'Recently',
                logo: job.company.substring(0, 2).toUpperCase()
            })));

            // Process Applications
            setApplications(apps);

            // Process Profile
            setUserProfile(profile);

        } catch (e) {
            console.error("Error loading dashboard data:", e);
        } finally {
            setLoading(false);
        }
    }
    loadDashboardData();
  }, [firestore, user]);

  // Derived Stats
  const stats = useMemo(() => {
    const appliedCount = applications.length;
    const interviewCount = applications.filter(a => a.status === 'interview').length;
    const responseRate = appliedCount > 0 ? Math.round((applications.filter(a => a.status !== 'applied').length / appliedCount) * 100) : 0;
    
    // Mocking profile views for now as we don't track it yet
    const profileViews = 48; 

    return [
        { label: 'Jobs Applied', value: appliedCount.toString(), icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Profile Views', value: profileViews.toString(), icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Interviews', value: interviewCount.toString(), icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Response Rate', value: `${responseRate}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    ];
  }, [applications]);

  // Recent Activity from Applications
  const recentActivity = useMemo(() => {
      const activities = applications.slice(0, 5).map(app => ({
          id: app.id,
          action: `Applied to ${app.jobTitle}`,
          company: app.companyName,
          time: app.appliedAt ? new Date(app.appliedAt.seconds * 1000 || app.appliedAt).toLocaleDateString() : 'Recently'
      }));
      
      // Add a "Profile Updated" activity if profile exists
      if (userProfile?.updatedAt) {
          activities.push({
              id: 'profile-update',
              action: 'Updated Profile',
              company: '',
              time: new Date(userProfile.updatedAt.seconds * 1000 || userProfile.updatedAt).toLocaleDateString()
          });
      }
      
      // Sort by time (simple string sort for now, ideally timestamp)
      return activities.slice(0, 5); 
  }, [applications, userProfile]);

  // Calculate Profile Completion
  const profileCompletion = useMemo(() => {
      if (!userProfile) return 0;
      let score = 0;
      if (userProfile.name) score += 10;
      if (userProfile.email) score += 10;
      if (userProfile.about) score += 20;
      if (userProfile.skills?.length > 0) score += 20;
      if (userProfile.experience?.length > 0) score += 20;
      if (userProfile.education?.length > 0) score += 20;
      return Math.min(score, 100);
  }, [userProfile]);


  if (loading) {
      return <div className="flex h-screen items-center justify-center"><ZLoader /></div>;
  }

  return (
    <div className="min-h-full w-full bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
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

        {/* Stats Grid - Mobile Optimized (4 cols) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full gap-2">
                <div className={`p-2 rounded-full ${stat.bg} mb-1`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Main Column: Recommended Jobs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
              <Link href="/dashboard/jobs" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recommendedJobs.length > 0 ? recommendedJobs.map((job) => (
                <Card key={job.id} className="group hover:border-primary/50 transition-colors cursor-pointer bg-white border-slate-200">
                  <CardContent className="p-4 md:p-5 flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-lg shrink-0">
                      {job.logo}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-slate-500 text-sm">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 self-start sm:self-center">
                          {job.type}
                        </Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4 text-sm text-slate-500">
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
              )) : (
                  <div className="text-center py-10 bg-white rounded-xl border border-dashed">
                      <p className="text-slate-500">No recommended jobs found at the moment.</p>
                      <Link href="/dashboard/jobs">
                        <Button variant="link" className="mt-2">Browse all jobs</Button>
                      </Link>
                  </div>
              )}
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
                  {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
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
                  )) : (
                      <p className="text-sm text-slate-500 text-center py-4">No recent activity.</p>
                  )}
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
                  <span className="font-bold text-yellow-400">{profileCompletion}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: `${profileCompletion}%` }} />
                </div>
                <Link href="/dashboard/profile" className="block pt-2">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                    {profileCompletion === 100 ? 'Update Profile' : 'Complete Profile'}
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
