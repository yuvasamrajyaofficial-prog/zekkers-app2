'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, XCircle, MoreHorizontal, ShieldAlert } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const reportedItems = [
  {
    id: 'RPT-001',
    type: 'Job Posting',
    title: 'Suspicious "Work from Home" Offer',
    reportedBy: 'user123',
    date: '2024-05-10',
    status: 'Pending',
    severity: 'High',
  },
  {
    id: 'RPT-002',
    type: 'User Profile',
    title: 'Inappropriate Profile Picture',
    reportedBy: 'admin_bot',
    date: '2024-05-09',
    status: 'Pending',
    severity: 'Medium',
  },
  {
    id: 'RPT-003',
    type: 'Comment',
    title: 'Spam comment on blog post',
    reportedBy: 'reader55',
    date: '2024-05-08',
    status: 'Resolved',
    severity: 'Low',
  },
];

export default function AdminModerationPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Content Moderation</h1>
            <p className="text-muted-foreground">Review and manage reported content and users.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 since yesterday</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actions Taken</CardTitle>
                <ShieldAlert className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auto-Flagged</CardTitle>
                <ShieldAlert className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">High confidence spam</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Moderation Queue</CardTitle>
            <CardDescription>Items requiring your attention.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="pending" className="w-full">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="flagged">Auto-Flagged</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="space-y-4 mt-4">
                    {reportedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-full ${item.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Badge variant="outline">{item.type}</Badge>
                                        <span>• Reported by {item.reportedBy}</span>
                                        <span>• {item.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <XCircle className="mr-2 h-4 w-4" /> Remove
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Contact Reporter</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Ban User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="resolved">
                    <div className="p-8 text-center text-muted-foreground">No resolved items to show.</div>
                </TabsContent>
                 <TabsContent value="flagged">
                    <div className="p-8 text-center text-muted-foreground">No auto-flagged items to show.</div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
