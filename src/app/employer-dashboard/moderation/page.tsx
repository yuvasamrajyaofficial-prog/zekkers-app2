'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const flaggedItems = [
  {
    id: 'FLG-001',
    type: 'Job Posting',
    title: 'Senior Developer - Remote',
    reason: 'Suspicious salary range',
    date: '2024-05-14',
    status: 'Under Review',
  },
  {
    id: 'FLG-002',
    type: 'Company Profile',
    title: 'About Us Section',
    reason: 'Inappropriate language',
    date: '2024-05-10',
    status: 'Resolved',
    resolution: 'Content updated',
  },
];

export default function EmployerModerationPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Content Moderation</h1>
            <p className="text-muted-foreground">View status of your content flagged for review.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Items pending admin action</p>
            </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Removed</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Items removed for violations</p>
            </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Good Standing</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <p className="text-xs text-muted-foreground">Content approval rate</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Flagged Content History</CardTitle>
            <CardDescription>A log of content that has been flagged by users or admins.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flaggedItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell className="text-muted-foreground">{item.reason}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                                <Badge variant={item.status === 'Resolved' ? 'default' : 'destructive'} 
                                    className={item.status === 'Resolved' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {item.status === 'Under Review' ? (
                                    <Button variant="outline" size="sm">Appeal</Button>
                                ) : (
                                    <span className="text-sm text-muted-foreground">{item.resolution}</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
