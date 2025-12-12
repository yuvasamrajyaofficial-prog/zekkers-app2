'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Server, Database, Globe, Cpu } from 'lucide-react';

export default function AdminHealthPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">System Health</h1>
            <p className="text-muted-foreground">Real-time monitoring of system performance and status.</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-600">All Systems Operational</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Latency</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">45ms</div>
                <p className="text-xs text-muted-foreground">Global average</p>
                <Progress value={15} className="mt-3 h-2" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">24%</div>
                <p className="text-xs text-muted-foreground">4 Cores Active</p>
                <Progress value={24} className="mt-3 h-2" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">6.2 GB</div>
                <p className="text-xs text-muted-foreground">of 16 GB Total</p>
                <Progress value={38} className="mt-3 h-2" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database Load</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Read/Write IOPS</p>
                <Progress value={12} className="mt-3 h-2" />
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Service Status</CardTitle>
                <CardDescription>Status of individual microservices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {[
                    { name: 'Authentication Service', status: 'Operational', uptime: '99.99%' },
                    { name: 'Job Matching Engine', status: 'Operational', uptime: '99.95%' },
                    { name: 'Notification Service', status: 'Operational', uptime: '99.98%' },
                    { name: 'Payment Gateway', status: 'Operational', uptime: '100%' },
                    { name: 'File Storage (CDN)', status: 'Operational', uptime: '99.99%' },
                ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {service.uptime} uptime
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>Log of recent system alerts and outages.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="mt-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">System Maintenance Completed</p>
                            <p className="text-xs text-muted-foreground">Today, 04:00 AM - Scheduled maintenance was completed successfully.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                         <div className="mt-1">
                            <div className="h-2 w-2 rounded-full bg-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">High Latency Detected</p>
                            <p className="text-xs text-muted-foreground">Yesterday, 02:30 PM - Temporary spike in API latency observed.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                         <div className="mt-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Database Backup Successful</p>
                            <p className="text-xs text-muted-foreground">Yesterday, 12:00 AM - Daily automated backup completed.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
