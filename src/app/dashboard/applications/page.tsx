'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Briefcase,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  ChevronRight,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockApplications = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Innovate Inc.',
    logo: PlaceHolderImages.find(p => p.id === 'company1')!.imageUrl,
    status: 'Viewed',
    appliedOn: '2024-07-28T10:00:00Z',
    atsScore: 88,
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    logo: PlaceHolderImages.find(p => p.id === 'company2')!.imageUrl,
    status: 'Interview Scheduled',
    interviewDate: '2024-08-05T14:00:00Z',
    appliedOn: '2024-07-25T09:00:00Z',
    atsScore: 92,
  },
  {
    id: 3,
    title: 'Data Analyst (Intern)',
    company: 'DataDriven Co.',
    logo: PlaceHolderImages.find(p => p.id === 'company3')!.imageUrl,
    status: 'Applied',
    appliedOn: '2024-07-29T11:00:00Z',
    atsScore: 75,
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'TechCorp',
    logo: PlaceHolderImages.find(p => p.id === 'company4')!.imageUrl,
    status: 'Shortlisted',
    appliedOn: '2024-07-22T15:00:00Z',
    atsScore: 81,
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'ZekkTech',
    logo: PlaceHolderImages.find(p => p.id === 'logo')!.imageUrl,
    status: 'Offer Received',
    appliedOn: '2024-07-15T18:00:00Z',
    atsScore: 95,
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudNine',
    logo: PlaceHolderImages.find(p => p.id === 'company5')!.imageUrl,
    status: 'Rejected',
    appliedOn: '2024-07-18T12:00:00Z',
    atsScore: 65,
  },
];

const statusStyles: { [key: string]: string } = {
  Applied: 'bg-slate-100 text-slate-600',
  Viewed: 'bg-blue-100 text-blue-600',
  Shortlisted: 'bg-indigo-100 text-indigo-600',
  'Interview Scheduled': 'bg-purple-100 text-purple-600',
  'Offer Received': 'bg-green-100 text-green-600',
  Rejected: 'bg-red-100 text-red-600',
};

const statusIcons: { [key: string]: React.ReactNode } = {
  Applied: <FileText className="w-4 h-4" />,
  Viewed: <Eye className="w-4 h-4" />,
  Shortlisted: <CheckCircle2 className="w-4 h-4" />,
  'Interview Scheduled': <Clock className="w-4 h-4" />,
  'Offer Received': <Star className="w-4 h-4 text-green-500" />,
  Rejected: <XCircle className="w-4 h-4" />,
};

const ApplicationCard = ({ app }: { app: (typeof mockApplications)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-4 rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-transform"
  >
    <div className="flex items-start gap-4">
      <Image
        src={app.logo}
        alt={`${app.company} logo`}
        width={40}
        height={40}
        className="rounded-lg"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-800">{app.title}</h3>
            <p className="text-sm text-slate-500">{app.company}</p>
          </div>
          <Badge className={`${statusStyles[app.status]} font-semibold gap-1.5`}>
            {statusIcons[app.status]}
            {app.status}
          </Badge>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Applied on {new Date(app.appliedOn).toLocaleDateString()}
          </p>
          <Button variant="ghost" size="sm" className="text-primary h-auto">
            View Details <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);

const KanbanBoard = () => {
  const stages = [
    'Applied',
    'Viewed',
    'Shortlisted',
    'Interview Scheduled',
    'Offer Received',
    'Rejected',
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stages.map((stage) => (
        <div key={stage} className="bg-slate-50/70 p-3 rounded-lg">
          <h3 className="font-semibold text-slate-600 p-2">
            {stage} ({mockApplications.filter((a) => a.status === stage).length})
          </h3>
          <div className="space-y-3">
            {mockApplications
              .filter((a) => a.status === stage)
              .map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-3 rounded-md border shadow-sm"
                >
                  <p className="font-semibold text-sm">{app.title}</p>
                  <p className="text-xs text-slate-500">{app.company}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ApplicationsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Briefcase className="text-primary" />
            My Applications
          </CardTitle>
          <CardDescription>
            Track all your job applications from a single, unified dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="kanban">Board View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {mockApplications.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="kanban" className="mt-6">
              <KanbanBoard />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
