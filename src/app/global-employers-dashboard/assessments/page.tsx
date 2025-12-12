'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileText, Code, BrainCircuit, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const assessments = [
  {
    id: 'ASM-001',
    name: 'Frontend React Challenge',
    type: 'Coding',
    duration: '60 mins',
    candidates: 45,
    avgScore: '78%',
    status: 'Active',
  },
  {
    id: 'ASM-002',
    name: 'Product Management Case Study',
    type: 'Take-home',
    duration: '3 days',
    candidates: 12,
    avgScore: '85%',
    status: 'Active',
  },
  {
    id: 'ASM-003',
    name: 'Cognitive Ability Test',
    type: 'Psychometric',
    duration: '30 mins',
    candidates: 120,
    avgScore: '72%',
    status: 'Active',
  },
  {
    id: 'ASM-004',
    name: 'System Design Interview',
    type: 'Technical',
    duration: '45 mins',
    candidates: 28,
    avgScore: '65%',
    status: 'Draft',
  },
];

export default function AssessmentsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Skill Assessments</h1>
            <p className="text-muted-foreground">Create and manage candidate assessments.</p>
        </div>
        <Button>
            <BrainCircuit className="mr-2 h-4 w-4" /> Create Assessment
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assessments..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-indigo-50 border-indigo-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-indigo-700">205</div>
                <p className="text-xs font-medium text-indigo-600">Total Completions</p>
            </CardContent>
        </Card>
        <Card className="bg-pink-50 border-pink-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-pink-700">76%</div>
                <p className="text-xs font-medium text-pink-600">Average Pass Rate</p>
            </CardContent>
        </Card>
        <Card className="bg-teal-50 border-teal-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-teal-700">3</div>
                <p className="text-xs font-medium text-teal-600">Active Tests</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Assessment Library</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Candidates</TableHead>
                        <TableHead>Avg. Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assessments.map((asm) => (
                        <TableRow key={asm.id}>
                            <TableCell className="font-medium">{asm.name}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {asm.type === 'Coding' && <Code className="h-3 w-3 text-blue-500" />}
                                    {asm.type === 'Take-home' && <FileText className="h-3 w-3 text-amber-500" />}
                                    {asm.type === 'Psychometric' && <BrainCircuit className="h-3 w-3 text-purple-500" />}
                                    {asm.type}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-3 w-3" /> {asm.duration}
                                </div>
                            </TableCell>
                            <TableCell>{asm.candidates}</TableCell>
                            <TableCell>{asm.avgScore}</TableCell>
                            <TableCell>
                                <Badge variant={asm.status === 'Active' ? 'default' : 'secondary'} className={asm.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                    {asm.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View Results</Button>
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
