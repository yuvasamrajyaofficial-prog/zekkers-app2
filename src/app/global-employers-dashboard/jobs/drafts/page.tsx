
'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Briefcase,
  PlusCircle,
  Search,
  LayoutGrid,
  List,
  FileText,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Kanban,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


// --- Types ---
type DraftStatus = 'autosaved' | 'in_progress' | 'needs_review' | 'pending_approval' | 'ready_to_publish';
type Draft = {
  id: string;
  title: string;
  progress: number;
  countries: string[];
  lastEdited: string;
  status: DraftStatus;
  complianceScore: number;
  aiScore: number;
  approvalStatus: 'Not Submitted' | 'Pending' | 'Approved';
};

// --- Mock Data ---
const mockDrafts: Draft[] = [
  { id: 'd1', title: 'Senior Golang Developer', progress: 90, countries: ['Germany', 'USA'], lastEdited: '2 hours ago', status: 'ready_to_publish', complianceScore: 95, aiScore: 88, approvalStatus: 'Approved' },
  { id: 'd2', title: 'Product Manager, Fintech', progress: 75, countries: ['Singapore'], lastEdited: '1 day ago', status: 'pending_approval', complianceScore: 98, aiScore: 91, approvalStatus: 'Pending' },
  { id: 'd3', title: 'UX Researcher', progress: 40, countries: ['UK'], lastEdited: '5 hours ago', status: 'in_progress', complianceScore: 60, aiScore: 75, approvalStatus: 'Not Submitted' },
  { id: 'd4', title: 'Cloud Security Architect', progress: 20, countries: [], lastEdited: '3 days ago', status: 'autosaved', complianceScore: 40, aiScore: 55, approvalStatus: 'Not Submitted' },
];

const KANBAN_STAGES: { id: DraftStatus, title: string }[] = [
    { id: 'autosaved', title: 'Autosaved' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'pending_approval', title: 'Pending Approval' },
    { id: 'ready_to_publish', title: 'Ready to Publish' },
];

const statusColors: { [key in DraftStatus]: string } = {
  autosaved: 'bg-slate-100 text-slate-600',
  in_progress: 'bg-blue-100 text-blue-700',
  needs_review: 'bg-yellow-100 text-yellow-700',
  pending_approval: 'bg-amber-100 text-amber-700',
  ready_to_publish: 'bg-green-100 text-green-700',
};

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Main Component ---
export default function DraftsPage() {
    const [drafts, setDrafts] = useState(mockDrafts);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredDrafts = useMemo(() => {
        return drafts.filter(d =>
            (d.title.toLowerCase().includes(search.toLowerCase())) &&
            (statusFilter === 'all' || d.status === statusFilter)
        );
    }, [drafts, search, statusFilter]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><FileText /> Draft Jobs</CardTitle>
              <CardDescription>Continue, refine, approve, or publish your saved job drafts.</CardDescription>
            </div>
            <Button><PlusCircle size={16} className="mr-2"/> New Draft</Button>
          </div>
        </CardHeader>
        <CardContent>
           <Tabs defaultValue="funnel">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-slate-50 rounded-lg border">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="Search drafts by title..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="flex w-full md:w-auto items-center gap-2">
                    <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
                        <SelectTrigger className="flex-grow"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            {KANBAN_STAGES.map(s => <SelectItem key={s.id} value={s.id} className="capitalize">{s.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="funnel" className="p-2"><Kanban/></TabsTrigger>
                        <TabsTrigger value="table" className="p-2"><List/></TabsTrigger>
                    </TabsList>
                </div>
            </div>
            
            <TabsContent value="funnel">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {KANBAN_STAGES.map(stage => (
                        <div key={stage.id} className="p-3 bg-slate-100/50 rounded-xl">
                            <h3 className="font-semibold mb-3 px-1 flex items-center gap-2">{stage.title} <Badge variant="secondary">{drafts.filter(d => d.status === stage.id).length}</Badge></h3>
                            <div className="space-y-3">
                                {drafts.filter(d => d.status === stage.id).map(draft => (
                                    <motion.div key={draft.id} variants={itemVariants}>
                                        <Card className="bg-white hover:shadow-md">
                                            <CardContent className="p-3">
                                                <p className="font-semibold text-sm truncate">{draft.title}</p>
                                                <p className="text-xs text-muted-foreground">Last edited: {draft.lastEdited}</p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <Progress value={draft.progress} className="w-2/3 h-1.5"/>
                                                    <span className="text-xs font-semibold">{draft.progress}%</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </TabsContent>

            <TabsContent value="table">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Compliance</TableHead>
                            <TableHead>Last Edited</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                        {filteredDrafts.map(draft => (
                            <motion.tr key={draft.id} variants={itemVariants}>
                                <TableCell className="font-medium">{draft.title}</TableCell>
                                <TableCell><Progress value={draft.progress} className="w-24 h-2"/></TableCell>
                                <TableCell><Badge className={statusColors[draft.status]}>{draft.status.replace('_', ' ')}</Badge></TableCell>
                                <TableCell>
                                    <div className={`flex items-center gap-1.5 font-semibold text-xs ${draft.complianceScore > 80 ? 'text-green-600' : 'text-amber-600'}`}>
                                        {draft.complianceScore > 80 ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                                        {draft.complianceScore}%
                                    </div>
                                </TableCell>
                                <TableCell>{draft.lastEdited}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Continue Editing</DropdownMenuItem>
                                            <DropdownMenuItem>Publish</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </Table>
            </TabsContent>
           </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
