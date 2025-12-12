
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, PlusCircle, Edit, Play, BarChart, CheckCircle, Award, Users, Send } from 'lucide-react';
import { useAssessments } from '@/hooks/useAssessments';
import { Assessment, AssessmentService } from '@/services/assessments';
import ZLoader from '@/components/ui/loader';
import { AssessmentBuilderModal } from '@/app/college-dashboard/assessments/_components/assessment-builder-modal';

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

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function GlobalAssessmentCenterPage() {
  const { assessments, setAssessments, loading } = useAssessments('demo-global-employer');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);

  const handleCreate = async (payload: Partial<Assessment>) => {
    const newAssessment = await AssessmentService.create('demo-global-employer', payload);
    setAssessments(prev => [newAssessment, ...prev]);
  };

  const handleSave = async (id: string, payload: Partial<Assessment>) => {
    await AssessmentService.update('demo-global-employer', id, payload);
    const updatedList = await AssessmentService.list('demo-global-employer');
    setAssessments(updatedList);
  };

  const openCreateModal = () => {
    setEditingAssessment(null);
    setIsBuilderOpen(true);
  };

  const openEditModal = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setIsBuilderOpen(true);
  };
  
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <ClipboardCheck className="w-6 h-6 text-primary" />
                Assessment Center
              </CardTitle>
              <CardDescription className="mt-1">
                Create, manage, and assign technical & aptitude assessments to candidates.
              </CardDescription>
            </div>
            <Button onClick={openCreateModal} className="gap-2 w-full md:w-auto">
              <PlusCircle size={16} />
              New Assessment Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Templates" value="12" icon={<ClipboardCheck className="text-muted-foreground"/>} />
                <StatCard title="Candidates Assessed" value="1,482" icon={<Users className="text-muted-foreground"/>} />
                <StatCard title="Avg. Score" value="76%" icon={<BarChart className="text-muted-foreground"/>} />
                <StatCard title="Avg. Pass Rate" value="68%" icon={<CheckCircle className="text-muted-foreground"/>} />
            </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <ZLoader />
            </div>
          ) : assessments.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">No Assessment Templates</h3>
                <p className="text-slate-500 mt-1">
                Click "New Assessment Template" to create your first skill test.
                </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {assessments.map((assessment) => (
                <motion.div key={assessment.id} variants={itemVariants} whileHover={{ y: -4 }} className="h-full">
                  <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{assessment.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                      <div className="text-sm text-muted-foreground">
                        {assessment.questions.length} questions • {assessment.durationMin} mins
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditModal(assessment)} className="gap-2">
                          <Edit className="w-4 h-4" /> Edit
                        </Button>
                        <Button size="sm" className="gap-2">
                          <Send className="w-4 h-4" /> Assign
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      <AssessmentBuilderModal
        key={editingAssessment ? editingAssessment.id : 'new-assessment-global'}
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onSave={async (payload) => {
          if (editingAssessment) {
            await handleSave(editingAssessment.id, payload);
          } else {
            await handleCreate(payload);
          }
          setIsBuilderOpen(false);
        }}
        initialAssessment={editingAssessment}
      />
    </div>
  );
}
