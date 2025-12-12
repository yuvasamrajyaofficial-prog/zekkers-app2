'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ExternalLink, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const verificationRequests = [
  {
    id: 'VR-001',
    entityName: 'StartUp Hub',
    type: 'Employer',
    submittedBy: 'john.doe@startuphub.com',
    date: '2024-05-14',
    status: 'Pending',
    documents: ['Business License', 'Tax ID'],
  },
  {
    id: 'VR-002',
    entityName: 'Green Earth NGO',
    type: 'NGO',
    submittedBy: 'sarah@greenearth.org',
    date: '2024-05-13',
    status: 'Pending',
    documents: ['Registration Certificate'],
  },
  {
    id: 'VR-003',
    entityName: 'Tech Institute',
    type: 'College',
    submittedBy: 'admin@techinstitute.edu',
    date: '2024-05-12',
    status: 'In Review',
    documents: ['Accreditation Proof'],
  },
];

export default function AdminVerificationPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Verification Requests</h1>
            <p className="text-muted-foreground">Review and approve entity verification documents.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">15</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">8</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rejected Today</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
            <CardDescription>Entities waiting for approval.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Entity Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {verificationRequests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell className="font-medium">{req.entityName}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{req.type}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{req.submittedBy}</TableCell>
                            <TableCell>{req.date}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    {req.documents.map((doc, i) => (
                                        <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" /> {doc}
                                        </Badge>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        <XCircle className="h-4 w-4 mr-1" /> Reject
                                    </Button>
                                </div>
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
