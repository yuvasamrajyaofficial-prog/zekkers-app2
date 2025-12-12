'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const functions = [
  {
    id: 'func-001',
    name: 'process-resume-upload',
    runtime: 'Node.js 18',
    status: 'Active',
    lastRun: '2 mins ago',
    duration: '1.2s',
    successRate: '99.8%',
  },
  {
    id: 'func-002',
    name: 'generate-roadmap-ai',
    runtime: 'Python 3.9',
    status: 'Active',
    lastRun: '5 mins ago',
    duration: '4.5s',
    successRate: '98.5%',
  },
  {
    id: 'func-003',
    name: 'sync-employer-data',
    runtime: 'Node.js 18',
    status: 'Idle',
    lastRun: '1 hour ago',
    duration: '12.4s',
    successRate: '100%',
  },
  {
    id: 'func-004',
    name: 'cleanup-temp-files',
    runtime: 'Go 1.20',
    status: 'Scheduled',
    lastRun: '1 day ago',
    duration: '45.2s',
    successRate: '100%',
  },
];

const logs = [
  { time: '10:45:23', level: 'INFO', message: 'Function execution started: process-resume-upload' },
  { time: '10:45:24', level: 'INFO', message: 'Parsing PDF document...' },
  { time: '10:45:24', level: 'WARN', message: 'Font missing in PDF, substituting default.' },
  { time: '10:45:25', level: 'INFO', message: 'Extracted 15 skills from resume.' },
  { time: '10:45:25', level: 'INFO', message: 'Function execution completed successfully.' },
  { time: '10:46:01', level: 'ERROR', message: 'Timeout: generate-roadmap-ai exceeded 10s limit.' },
];

export default function AdminFunctionsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Cloud Functions</h1>
            <p className="text-muted-foreground">Monitor and manage serverless functions.</p>
        </div>
        <Button>
            <Play className="mr-2 h-4 w-4" /> Deploy Function
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
            <div className="grid gap-4">
                {functions.map((func) => (
                    <Card key={func.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-100 rounded-md">
                                    <Terminal className="h-5 w-5 text-slate-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{func.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{func.runtime}</span>
                                        <span>• Last run {func.lastRun}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-medium">{func.duration}</p>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                </div>
                                <Badge variant={func.status === 'Active' ? 'default' : 'secondary'} className={func.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                    {func.status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div className="md:col-span-1">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Live Logs</CardTitle>
                    <CardDescription>Real-time execution logs.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[400px] w-full p-4 bg-slate-950 text-slate-50 font-mono text-xs">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-2">
                                <span className="text-slate-500">[{log.time}]</span>{' '}
                                <span className={log.level === 'INFO' ? 'text-blue-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-red-400'}>
                                    {log.level}
                                </span>{' '}
                                <span>{log.message}</span>
                            </div>
                        ))}
                        <div className="animate-pulse">_</div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
