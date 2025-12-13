'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFirestore, useUser } from '@/firebase';
import { fetchJobs } from '@/services/jobs';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Users,
  UserCheck,
  PlusCircle,
  ArrowRight,
  Clock,
  TrendingUp,
  Search
} from 'lucide-react';
import ZLoader from '@/components/ui/loader';

export default function EmployerDashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(true);
  
  // Stats
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [totalApplicantsCount, setTotalApplicantsCount] = useState(0);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
        if (!firestore || !user) return;
        setLoading(true);
        try {
            // 1. Fetch Jobs (Active & All)
            const allJobs = await fetchJobs(firestore, 'all'); // Assuming fetchJobs filters by employerId internally or we filter here
            // Note: fetchJobs currently fetches ALL jobs. We need to filter by employerId if the service doesn't.
            // Looking at service/jobs.ts, fetchJobs('all') fetches all. We should probably add an employerId filter to the service or filter here.
            // For now, filtering client-side as a quick fix, but ideally service should handle it.
            const myJobs = allJobs.filter(job => job.employerId === user.uid);
            
            const activeJobs = myJobs.filter(job => job.status === 'published');
            setActiveJobsCount(activeJobs.length);
            setRecentJobs(myJobs.slice(0, 3));

            // 2. Fetch Applications (for my jobs)
            // This requires a query on 'applications' collection where 'employerId' == user.uid
            const appsQuery = query(
                collection(firestore, 'applications'),
                where('employerId', '==', user.uid),
                orderBy('appliedAt', 'desc'),
                limit(5)
            );
            const appsSnapshot = await getDocs(appsQuery);
            setTotalApplicantsCount(appsSnapshot.size); // This is just recent ones, ideally we need a count query or aggregate
            
            // To get total count correctly we might need a separate count query, but for now let's just show count of fetched (or fetch all for count)
            // Let's fetch all for count (careful with scale)
            const allAppsQuery = query(collection(firestore, 'applications'), where('employerId', '==', user.uid));
            const allAppsSnap = await getDocs(allAppsQuery);
            setTotalApplicantsCount(allAppsSnap.size);

            setRecentApplications(appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        } catch (error) {
            console.error("Error loading employer dashboard:", error);
        } finally {
            setLoading(false);
        }
    };
    loadDashboardData();
  }, [firestore, user]);

  if (loading) {
      return <div className="flex h-full items-center justify-center"><ZLoader /></div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your hiring pipeline.</p>
        </div>
        <div className="flex gap-2">
            <Button asChild>
                <Link href="/employer-dashboard/jobs/create" className="gap-2">
                    <PlusCircle className="w-4 h-4" /> Post a Job
                </Link>
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobsCount}</div>
            <p className="text-xs text-muted-foreground">
              +0 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplicantsCount}</div>
            <p className="text-xs text-muted-foreground">
              Across all active listings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiring Velocity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12d</div>
            <p className="text-xs text-muted-foreground">
              Avg. time to hire
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Recent Applications */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              You have {totalApplicantsCount} total applicants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {recentApplications.length > 0 ? recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {app.studentId?.substring(0, 2).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">{app.jobTitle}</p>
                                <p className="text-sm text-muted-foreground">Applied {app.appliedAt ? new Date(app.appliedAt.seconds * 1000).toLocaleDateString() : 'Recently'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">{app.status}</Badge>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/employer-dashboard/candidates?id=${app.id}`}>View</Link>
                            </Button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No applications yet.
                    </div>
                )}
            </div>
          </CardContent>
        </Card>

        {/* Active Jobs List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>
              Your currently published job listings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {recentJobs.length > 0 ? recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.location} • {job.type}</p>
                        </div>
                        <Badge variant={job.status === 'published' ? 'default' : 'secondary'}>
                            {job.status}
                        </Badge>
                    </div>
                )) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No active jobs.
                    </div>
                )}
                <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/employer-dashboard/jobs">View All Jobs</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
