'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShieldCheck, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const checks = [
  {
    id: 'CHK-001',
    candidate: 'John Doe',
    type: 'Criminal Record',
    status: 'Clear',
    date: '2024-05-14',
    provider: 'Checkr',
  },
  {
    id: 'CHK-002',
    candidate: 'Jane Smith',
    type: 'Employment Verification',
    status: 'Pending',
    date: '2024-05-15',
    provider: 'Hireright',
  },
  {
    id: 'CHK-003',
    candidate: 'Carlos Ruiz',
    type: 'Education Verification',
    status: 'Flagged',
    date: '2024-05-13',
    provider: 'First Advantage',
  },
];

export default function CompliancePage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Compliance & Background Checks</h1>
            <p className="text-muted-foreground">Ensure your hiring meets global compliance standards.</p>
        </div>
        <Button>
            <ShieldCheck className="mr-2 h-4 w-4" /> New Check
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-700">95%</div>
                <p className="text-xs font-medium text-green-600">Compliance Score</p>
            </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-700">12</div>
                <p className="text-xs font-medium text-blue-600">Checks In Progress</p>
            </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-700">3</div>
                <p className="text-xs font-medium text-amber-600">Action Required</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Background Checks</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Report</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {checks.map((check) => (
                        <TableRow key={check.id}>
                            <TableCell className="font-medium">{check.candidate}</TableCell>
                            <TableCell>{check.type}</TableCell>
                            <TableCell>{check.provider}</TableCell>
                            <TableCell>{check.date}</TableCell>
                            <TableCell>
                                <Badge variant={check.status === 'Clear' ? 'default' : check.status === 'Flagged' ? 'destructive' : 'secondary'}
                                    className={check.status === 'Clear' ? 'bg-green-100 text-green-700 hover:bg-green-100' : check.status === 'Flagged' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}>
                                    {check.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <FileText className="h-4 w-4" />
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
