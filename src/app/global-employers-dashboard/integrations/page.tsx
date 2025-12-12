'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const integrations = [
  {
    id: 'INT-001',
    name: 'Slack',
    description: 'Receive notifications about new applications and interview updates directly in Slack.',
    status: 'Connected',
    logo: 'S',
    color: 'bg-purple-600',
  },
  {
    id: 'INT-002',
    name: 'Google Calendar',
    description: 'Sync interview schedules with your Google Calendar to avoid conflicts.',
    status: 'Connected',
    logo: 'G',
    color: 'bg-blue-500',
  },
  {
    id: 'INT-003',
    name: 'Zoom',
    description: 'Automatically generate Zoom meeting links for scheduled video interviews.',
    status: 'Disconnected',
    logo: 'Z',
    color: 'bg-blue-400',
  },
  {
    id: 'INT-004',
    name: 'LinkedIn Recruiter',
    description: 'Import candidates and sync job postings with LinkedIn Recruiter.',
    status: 'Disconnected',
    logo: 'L',
    color: 'bg-blue-700',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
            <p className="text-muted-foreground">Connect your favorite tools to streamline your hiring workflow.</p>
        </div>
        <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Status
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
            <Card key={integration.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-lg ${integration.color} flex items-center justify-center text-white font-bold text-lg`}>
                            {integration.logo}
                        </div>
                        <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <CardDescription className="text-xs mt-1 max-w-[250px]">{integration.description}</CardDescription>
                        </div>
                    </div>
                    <Switch checked={integration.status === 'Connected'} />
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-sm">
                        {integration.status === 'Connected' ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-green-600 font-medium">Connected</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-500">Not Connected</span>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
