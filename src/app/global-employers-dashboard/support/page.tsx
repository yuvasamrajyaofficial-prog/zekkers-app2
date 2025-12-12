'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tickets = [
  {
    id: 'TKT-2024-001',
    subject: 'Billing discrepancy on invoice #INV-992',
    status: 'Open',
    priority: 'High',
    created: '2 hours ago',
    lastUpdate: '10 mins ago',
  },
  {
    id: 'TKT-2024-002',
    subject: 'API Integration assistance',
    status: 'In Progress',
    priority: 'Medium',
    created: '1 day ago',
    lastUpdate: '4 hours ago',
  },
  {
    id: 'TKT-2024-003',
    subject: 'Feature request: Custom reports',
    status: 'Closed',
    priority: 'Low',
    created: '3 days ago',
    lastUpdate: '1 day ago',
  },
];

export default function SupportPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Enterprise Support</h1>
            <p className="text-muted-foreground">Priority support and SLA management for your organization.</p>
        </div>
        <Button>
            <MessageSquare className="mr-2 h-4 w-4" /> Create New Ticket
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Response Time</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1.5 Hours</div>
                <p className="text-xs text-muted-foreground">Within SLA (Target: 4h)</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 High Priority</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">4.9/5</div>
                <p className="text-xs text-muted-foreground">Based on last 10 tickets</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell>{ticket.subject}</TableCell>
                            <TableCell>
                                <Badge variant={ticket.status === 'Open' ? 'destructive' : ticket.status === 'Closed' ? 'secondary' : 'default'}
                                    className={ticket.status === 'Open' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}>
                                    {ticket.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {ticket.priority === 'High' ? <AlertCircle className="h-3 w-3 text-red-500" /> : <Clock className="h-3 w-3 text-slate-400" />}
                                    {ticket.priority}
                                </div>
                            </TableCell>
                            <TableCell>{ticket.lastUpdate}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
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
