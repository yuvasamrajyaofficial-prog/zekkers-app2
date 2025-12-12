'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal, User, FileText, CheckCircle2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const candidates = [
  {
    id: 'CAN-001',
    name: 'Michael Chen',
    role: 'Senior Backend Engineer',
    stage: 'Technical Interview',
    score: 92,
    source: 'LinkedIn',
    applied: '2 days ago',
  },
  {
    id: 'CAN-002',
    name: 'Sarah Williams',
    role: 'Product Designer',
    stage: 'Screening',
    score: 88,
    source: 'Referral',
    applied: '1 day ago',
  },
  {
    id: 'CAN-003',
    name: 'David Kim',
    role: 'Data Scientist',
    stage: 'Offer',
    score: 95,
    source: 'Career Page',
    applied: '1 week ago',
  },
  {
    id: 'CAN-004',
    name: 'Emily Davis',
    role: 'Marketing Manager',
    stage: 'New',
    score: 75,
    source: 'Indeed',
    applied: '3 hours ago',
  },
];

export default function AtsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Applicant Tracking System</h1>
            <p className="text-muted-foreground">Manage your hiring pipeline and candidate data.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter View
            </Button>
            <Button>Add Candidate</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-slate-100 border-slate-200">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">New</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-slate-800">15</div>
            </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Screening</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-blue-800">8</div>
            </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-purple-600">Interview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-purple-800">5</div>
            </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-amber-600">Offer</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-amber-800">2</div>
            </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-green-600">Hired</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-green-800">12</div>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="board">Kanban Board</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Candidates</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                            type="search"
                            placeholder="Search candidates..."
                            className="pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Candidate</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Stage</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Applied</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {candidates.map((candidate) => (
                                <TableRow key={candidate.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{candidate.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{candidate.role}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-slate-50">
                                            {candidate.stage}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${candidate.score > 90 ? 'bg-green-500' : candidate.score > 75 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${candidate.score}%` }}></div>
                                            </div>
                                            <span className="text-xs font-medium">{candidate.score}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{candidate.source}</TableCell>
                                    <TableCell>{candidate.applied}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="board">
            <div className="p-12 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Kanban board visualization would appear here.
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
