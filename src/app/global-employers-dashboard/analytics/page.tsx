'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, Activity, DollarSign, Users, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Global Analytics</h1>
            <p className="text-muted-foreground">Insights into your global hiring performance and costs.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Export Report</Button>
            <Button>
                <Activity className="mr-2 h-4 w-4" /> Live View
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hires</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">85</div>
                <p className="text-xs text-muted-foreground">Across 12 countries</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost per Hire</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$1,850</div>
                <p className="text-xs text-muted-foreground">-5% avg. reduction</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time to Fill</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">24 Days</div>
                <p className="text-xs text-muted-foreground">Global average</p>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hiring" className="w-full">
        <TabsList>
            <TabsTrigger value="hiring">Hiring Funnel</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hiring" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-[400px] flex flex-col">
                    <CardHeader>
                        <CardTitle>Applications by Region</CardTitle>
                        <CardDescription>Where are your candidates coming from?</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center bg-slate-50/50 m-4 rounded-lg border border-dashed">
                        <div className="text-center text-muted-foreground">
                            <PieChart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Interactive Map Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="h-[400px] flex flex-col">
                    <CardHeader>
                        <CardTitle>Pipeline Efficiency</CardTitle>
                        <CardDescription>Conversion rates at each stage.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center bg-slate-50/50 m-4 rounded-lg border border-dashed">
                         <div className="text-center text-muted-foreground">
                            <BarChart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Funnel Chart Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        
        <TabsContent value="demographics">
             <div className="p-12 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Demographics data visualization would appear here.
            </div>
        </TabsContent>
        
        <TabsContent value="costs">
             <div className="p-12 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Cost analysis charts would appear here.
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
