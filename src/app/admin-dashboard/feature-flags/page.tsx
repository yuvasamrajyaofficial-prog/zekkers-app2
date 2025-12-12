'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Zap, Lock } from 'lucide-react';

const features = [
  {
    id: 'feat-001',
    name: 'New Dashboard Layout',
    description: 'Enable the new grid-based dashboard layout for all users.',
    status: 'Beta',
    enabled: true,
  },
  {
    id: 'feat-002',
    name: 'AI Resume Analysis v2',
    description: 'Use the upgraded Gemini 1.5 Pro model for resume parsing.',
    status: 'Alpha',
    enabled: false,
  },
  {
    id: 'feat-003',
    name: 'Dark Mode Support',
    description: 'Allow users to toggle dark mode in settings.',
    status: 'Stable',
    enabled: true,
  },
  {
    id: 'feat-004',
    name: 'Stripe Integration',
    description: 'Enable Stripe payment gateway for employer subscriptions.',
    status: 'Stable',
    enabled: true,
  },
  {
    id: 'feat-005',
    name: 'Video Interviews',
    description: 'Enable built-in video interview platform.',
    status: 'Beta',
    enabled: false,
  },
];

export default function AdminFeatureFlagsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Feature Flags</h1>
            <p className="text-muted-foreground">Manage feature rollouts and A/B tests.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {features.map((feature) => (
            <Card key={feature.id}>
                <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                            <FlaskConical className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{feature.name}</h3>
                                <Badge variant={feature.status === 'Stable' ? 'default' : 'secondary'} className={feature.status === 'Stable' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-purple-100 text-purple-700 hover:bg-purple-100'}>
                                    {feature.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground mt-1">{feature.description}</p>
                            <p className="text-xs text-slate-400 mt-2 font-mono">{feature.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`text-sm font-medium ${feature.enabled ? 'text-green-600' : 'text-slate-500'}`}>
                            {feature.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <Switch checked={feature.enabled} />
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
