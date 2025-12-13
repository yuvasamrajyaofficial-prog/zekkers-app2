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
import { useUser, useFirestore } from '@/firebase';
import { fetchStudentApplications, Application } from '@/services/applications';
import ZLoader from '@/components/ui/loader';


const statusStyles: { [key: string]: string } = {
  applied: 'bg-slate-100 text-slate-600',
  screening: 'bg-blue-100 text-blue-600',
  interview: 'bg-purple-100 text-purple-600',
  offer: 'bg-green-100 text-green-600',
  rejected: 'bg-red-100 text-red-600',
};

const statusIcons: { [key: string]: React.ReactNode } = {
  applied: <FileText className="w-4 h-4" />,
  screening: <Eye className="w-4 h-4" />,
  interview: <Clock className="w-4 h-4" />,
  offer: <Star className="w-4 h-4 text-green-500" />,
  rejected: <XCircle className="w-4 h-4" />,
};

const ApplicationCard = ({ app }: { app: Application }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-4 rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-transform"
  >
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">
        {app.companyName?.slice(0, 2).toUpperCase() || 'CO'}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-slate-800">{app.jobTitle}</h3>
            <p className="text-sm text-slate-500">{app.companyName}</p>
          </div>
          <Badge className={`${statusStyles[app.status]} font-semibold gap-1.5 capitalize`}>
            {statusIcons[app.status]}
            {app.status}
          </Badge>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Applied on {app.appliedAt ? new Date(app.appliedAt.seconds * 1000 || app.appliedAt).toLocaleDateString() : 'N/A'}
          </p>
          <Button variant="ghost" size="sm" className="text-primary h-auto">
            View Details <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);

const KanbanBoard = ({ applications }: { applications: Application[] }) => {
  const stages = [
    'applied',
    'screening',
    'interview',
    'offer',
    'rejected',
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stages.map((stage) => (
        <div key={stage} className="bg-slate-50/70 p-3 rounded-lg">
          <h3 className="font-semibold text-slate-600 p-2 capitalize">
            {stage} ({applications.filter((a) => a.status === stage).length})
          </h3>
          <div className="space-y-3">
            {applications
              .filter((a) => a.status === stage)
              .map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-3 rounded-md border shadow-sm"
                >
                  <p className="font-semibold text-sm">{app.jobTitle}</p>
                  <p className="text-xs text-slate-500">{app.companyName}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ApplicationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadApplications = async () => {
        if (!user || !firestore) return;
        setLoading(true);
        try {
            const apps = await fetchStudentApplications(firestore, user.uid);
            setApplications(apps);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };
    loadApplications();
  }, [user, firestore]);

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
                {loading ? (
                    <div className="flex justify-center py-8"><ZLoader /></div>
                ) : applications.length > 0 ? (
                    applications.map((app) => (
                        <ApplicationCard key={app.id} app={app} />
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">No applications found.</div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="kanban" className="mt-6">
              <KanbanBoard applications={applications} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
