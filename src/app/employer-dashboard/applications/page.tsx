'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal, User, Mail, Phone } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const applications = [
  {
    id: 'APP-101',
    candidate: 'Alice Johnson',
    role: 'Frontend Developer',
    email: 'alice.j@example.com',
    applied: '2 hours ago',
    status: 'New',
    score: 85,
  },
  {
    id: 'APP-102',
    candidate: 'Bob Smith',
    role: 'Product Manager',
    email: 'bob.smith@example.com',
    applied: '1 day ago',
    status: 'Screening',
    score: 92,
  },
  {
    id: 'APP-103',
    candidate: 'Charlie Brown',
    role: 'Frontend Developer',
    email: 'charlie.b@example.com',
    applied: '2 days ago',
    status: 'Interview',
    score: 78,
  },
  {
    id: 'APP-104',
    candidate: 'Diana Prince',
    role: 'UX Designer',
    email: 'diana.p@example.com',
    applied: '3 days ago',
    status: 'Rejected',
    score: 60,
  },
];

export default function EmployerApplicationsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">Manage and track candidate applications.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button>Export CSV</Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-700">12</div>
                <p className="text-xs font-medium text-blue-600">New Applications</p>
            </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-700">5</div>
                <p className="text-xs font-medium text-amber-600">In Screening</p>
            </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-700">3</div>
                <p className="text-xs font-medium text-purple-600">Interview Stage</p>
            </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-700">1</div>
                <p className="text-xs font-medium text-green-600">Hired This Month</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Match Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{app.candidate}</p>
                                        <p className="text-xs text-muted-foreground">{app.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{app.role}</TableCell>
                            <TableCell>{app.applied}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${app.score > 80 ? 'bg-green-500' : app.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${app.score}%` }}></div>
                                    </div>
                                    <span className="text-xs font-medium">{app.score}%</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={app.status === 'New' ? 'default' : app.status === 'Rejected' ? 'destructive' : 'secondary'}
                                    className={app.status === 'New' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}>
                                    {app.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Reject Application</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
