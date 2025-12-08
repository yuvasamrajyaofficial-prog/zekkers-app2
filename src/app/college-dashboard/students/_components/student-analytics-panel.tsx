'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudentAnalytics } from '@/hooks/use-student-analytics';
import { ProfileData } from '@/services/profile';
import { Users, UserCheck, BarChart3, Star } from 'lucide-react';

const AnalyticsCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card className="bg-slate-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
)

export function StudentAnalyticsPanel({ students }: { students: ProfileData[] }) {
    const { total, readyCount, avgResume, placements } = useStudentAnalytics(students);

    return (
        <aside className="space-y-4 lg:sticky lg:top-4">
            <Card>
                <CardHeader>
                    <CardTitle>Student Analytics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                   <AnalyticsCard title="Total Students" value={total} icon={<Users className="w-5 h-5 text-muted-foreground" />} />
                   <AnalyticsCard title="Ready to Place" value={readyCount} icon={<UserCheck className="w-5 h-5 text-muted-foreground" />} />
                   <AnalyticsCard title="Avg. Resume Score" value={`${avgResume}%`} icon={<BarChart3 className="w-5 h-5 text-muted-foreground" />} />
                   <AnalyticsCard title="Placed" value={placements} icon={<Star className="w-5 h-5 text-muted-foreground" />} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {/* Add quick action buttons here later */}
                    <p className="text-sm text-muted-foreground">Quick actions will be available here.</p>
                </CardContent>
            </Card>
        </aside>
    )
}
