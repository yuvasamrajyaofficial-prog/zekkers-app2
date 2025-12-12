'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, User, Clock } from 'lucide-react';
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
    id: 'TKT-1024',
    subject: 'Login Issue on Mobile',
    user: 'alex.doe@example.com',
    status: 'Open',
    priority: 'High',
    created: '2 hours ago',
  },
  {
    id: 'TKT-1023',
    subject: 'Payment failed for subscription',
    user: 'sarah.smith@company.com',
    status: 'In Progress',
    priority: 'Critical',
    created: '5 hours ago',
  },
  {
    id: 'TKT-1022',
    subject: 'How to update profile picture?',
    user: 'newuser123@gmail.com',
    status: 'Resolved',
    priority: 'Low',
    created: '1 day ago',
  },
  {
    id: 'TKT-1021',
    subject: 'Bug in job posting form',
    user: 'recruiter@techcorp.com',
    status: 'Open',
    priority: 'Medium',
    created: '1 day ago',
  },
];

export default function AdminSupportPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
            <p className="text-muted-foreground">Manage and resolve user support requests.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">24</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Response Time</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1h 45m</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">4.8/5.0</div>
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
                        <TableHead>ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell>{ticket.subject}</TableCell>
                            <TableCell className="text-muted-foreground">{ticket.user}</TableCell>
                            <TableCell>
                                <Badge variant={ticket.status === 'Open' ? 'default' : ticket.status === 'Resolved' ? 'secondary' : 'outline'}
                                    className={ticket.status === 'Open' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ticket.status === 'Resolved' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}>
                                    {ticket.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={ticket.priority === 'Critical' ? 'border-red-500 text-red-500' : ticket.priority === 'High' ? 'border-amber-500 text-amber-500' : ''}>
                                    {ticket.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>{ticket.created}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4" /> Reply
                                </Button>
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
