'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShieldCheck, ShieldAlert, FileText, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const applicants = [
  {
    id: 'APP-001',
    name: 'Michael Chen',
    role: 'Frontend Developer',
    company: 'TechCorp Solutions',
    appliedDate: '2024-05-15',
    fraudScore: 12, // Low
    status: 'Screening',
  },
  {
    id: 'APP-002',
    name: 'Emily Davis',
    role: 'Product Manager',
    company: 'Innovate Inc.',
    appliedDate: '2024-05-14',
    fraudScore: 85, // High
    status: 'Flagged',
  },
  {
    id: 'APP-003',
    name: 'David Wilson',
    role: 'Data Scientist',
    company: 'Global University',
    appliedDate: '2024-05-13',
    fraudScore: 5, // Low
    status: 'Interview',
  },
  {
    id: 'APP-004',
    name: 'Sarah Johnson',
    role: 'UX Designer',
    company: 'StartUp Hub',
    appliedDate: '2024-05-12',
    fraudScore: 45, // Medium
    status: 'Rejected',
  },
];

export default function AdminApplicantsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Applicants & Fraud</h1>
            <p className="text-muted-foreground">Monitor applicant quality and detect fraudulent activity.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applicants..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>Global view of recent job applications.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Fraud Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{app.name}</p>
                                        <p className="text-xs text-muted-foreground">{app.appliedDate}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{app.role}</TableCell>
                            <TableCell>{app.company}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {app.fraudScore > 80 ? (
                                        <ShieldAlert className="h-4 w-4 text-red-500" />
                                    ) : app.fraudScore > 40 ? (
                                        <ShieldAlert className="h-4 w-4 text-amber-500" />
                                    ) : (
                                        <ShieldCheck className="h-4 w-4 text-green-500" />
                                    )}
                                    <span className={app.fraudScore > 80 ? 'text-red-600 font-bold' : app.fraudScore > 40 ? 'text-amber-600' : 'text-green-600'}>
                                        {app.fraudScore}/100
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{app.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                    <FileText className="h-4 w-4" /> Details
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
