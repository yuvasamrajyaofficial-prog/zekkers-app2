
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, PlusCircle, Edit, Play } from 'lucide-react';
import { useAssessments } from '@/hooks/useAssessments';
import { Assessment, AssessmentService } from '@/services/assessments';
import ZLoader from '@/components/ui/loader';
import { AssessmentBuilderModal } from './_components/assessment-builder-modal';

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

export default function AssessmentsPage() {
  const { assessments, setAssessments, loading } = useAssessments('demo-college');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);

  const handleCreate = async (payload: Partial<Assessment>) => {
    const newAssessment = await AssessmentService.create('demo-college', payload);
    setAssessments(prev => [newAssessment, ...prev]);
  };

  const handleSave = async (id: string, payload: Partial<Assessment>) => {
    await AssessmentService.update('demo-college', id, payload);
    const updatedList = await AssessmentService.list('demo-college');
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
                Create, manage, and analyze assessments for your students.
              </CardDescription>
            </div>
            <Button onClick={openCreateModal} className="gap-2 w-full md:w-auto">
              <PlusCircle size={16} />
              New Assessment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <ZLoader />
            </div>
          ) : assessments.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">No Assessments Found</h3>
                <p className="text-slate-500 mt-1">
                Click "New Assessment" to create your first template.
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
                        <Button variant="secondary" size="sm" className="gap-2">
                          <Play className="w-4 h-4" /> Preview
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
        key={editingAssessment ? editingAssessment.id : 'new-assessment'}
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
