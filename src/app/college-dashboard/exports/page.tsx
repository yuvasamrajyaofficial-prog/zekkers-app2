'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Calendar,
  Database,
  CheckCircle,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ExportOption {
  id: string;
  title: string;
  description: string;
  formats: string[];
}

const exportOptions: ExportOption[] = [
  {
    id: 'students',
    title: 'Student Master Export',
    description:
      'Export all student profiles, academic info, skills, placements, assessments.',
    formats: ['CSV', 'Excel', 'PDF', 'JSON'],
  },
  {
    id: 'drives',
    title: 'Placement Drives Report',
    description: 'Export drive details, attendance, results, company selections.',
    formats: ['Excel', 'PDF'],
  },
  {
    id: 'assessments',
    title: 'Assessment Results Export',
    description:
      'Get question-wise analytics, performance breakdown, difficulty maps.',
    formats: ['Excel', 'PDF'],
  },
  {
    id: 'roadmaps',
    title: 'AI Roadmap Analytics',
    description:
      'Export department-wise skill gaps, progress, AI roadmap insights.',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'employers',
    title: 'Employer Partnerships Export',
    description: 'List of connected employers, job postings, hiring statistics.',
    formats: ['CSV', 'PDF'],
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
};
  
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function CollegeExportsReports() {
  const [selected, setSelected] = useState<ExportOption | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [logs] = useState([
    {
      id: '1',
      file: 'students_export_2025_02_20.xlsx',
      date: '20 Feb 2025',
      status: 'Completed',
    },
    {
      id: '2',
      file: 'assessment_results_2025_02_18.pdf',
      date: '18 Feb 2025',
      status: 'Completed',
    },
    {
      id: '3',
      file: 'roadmap_insights_2025_02_15.pdf',
      date: '15 Feb 2025',
      status: 'Completed',
    },
  ]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <FileText /> Exports & Reports
          </CardTitle>
          <p className="text-slate-500 mt-1 max-w-2xl">
            Generate detailed data exports, PDF reports, analytics summaries, and
            schedule automated reporting.
          </p>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {exportOptions.map((option) => (
              <motion.div
                key={option.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(option)}
                className="h-full"
              >
                <Card className="p-4 cursor-pointer h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader className="p-2">
                    <CardTitle>{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 flex-1">
                    <p className="text-sm text-slate-500">{option.description}</p>
                  </CardContent>
                  <div className="p-2 mt-auto flex gap-2 text-xs text-slate-600">
                    {option.formats.map((f) => (
                      <span key={f} className="px-2 py-1 bg-slate-100 rounded-md">
                        {f}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-xl">{selected.title}</SheetTitle>
                <SheetDescription>
                  Choose a format and generate the export.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <Label className="font-semibold mb-2 block">Available Formats</Label>
                  <div className="flex gap-3 flex-wrap">
                    {selected.formats.map((format) => (
                      <Button key={format} variant="outline" className="gap-2">
                        <Download size={16} /> {format}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold mb-2 block">
                    Schedule Automated Reports
                  </Label>
                  <p className="text-sm text-slate-500 mb-3">
                    Send reports to TPO/HOD emails daily, weekly, or monthly.
                  </p>
                  <Select onValueChange={() => setScheduled(true)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  {scheduled && (
                    <p className="mt-2 text-green-600 text-sm flex items-center gap-2">
                      <CheckCircle size={16} /> Scheduled successfully
                    </p>
                  )}
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database /> Download History
          </CardTitle>
          <div className="relative pt-2">
            <Search className="absolute left-3 top-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search exports..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.file}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download size={14} /> Download
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
