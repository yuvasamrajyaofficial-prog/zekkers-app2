
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input as ShadCNInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Assessment, Question, QuestionType } from '@/services/assessments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AssessmentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: Partial<Assessment>) => Promise<void>;
  initialAssessment?: Partial<Assessment> | null;
}

const emptyAssessment: Partial<Assessment> = {
  title: '',
  description: '',
  durationMin: 30,
  questions: [],
  sections: [],
};

export const AssessmentBuilderModal: React.FC<AssessmentBuilderModalProps> = ({ isOpen, onClose, onSave, initialAssessment }) => {
  const [local, setLocal] = useState<Partial<Assessment>>(emptyAssessment);

  useEffect(() => {
    if (isOpen) {
      setLocal(initialAssessment || emptyAssessment);
    }
  }, [isOpen, initialAssessment]);
  
  if (!isOpen) return null;

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: uuidv4(),
      type,
      title: 'New Question',
      marks: 1,
      choices: type === 'mcq' || type === 'multi' ? ['Option 1', 'Option 2'] : undefined,
    } as Question;
    setLocal(prev => ({ ...prev, questions: [...(prev.questions || []), newQuestion] }));
  };

  const updateQuestion = (id: string, patch: Partial<Question>) => {
    setLocal(prev => ({
      ...prev,
      questions: (prev.questions || []).map(q => q.id === id ? { ...q, ...patch } : q),
    }));
  };
  
  const removeQuestion = (id: string) => {
    setLocal(prev => ({
      ...prev,
      questions: (prev.questions || []).filter(q => q.id !== id),
    }));
  }

  const handleSave = async () => {
    await onSave(local);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{initialAssessment ? 'Edit Assessment' : 'Create New Assessment'}</DialogTitle>
          <DialogDescription>Build your assessment template, add questions, and set the rules.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Main Content: Questions */}
          <div className="md:col-span-2 space-y-4 overflow-y-auto pr-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assessment Title</Label>
              <ShadCNInput id="title" placeholder="e.g., Weekly Aptitude Test" value={local.title || ''} onChange={e => setLocal({ ...local, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="A short description of the assessment." value={local.description || ''} onChange={e => setLocal({ ...local, description: e.target.value })} />
            </div>

            <div>
              <h4 className="font-semibold text-lg mt-6 mb-2">Questions</h4>
              <div className="space-y-3">
                {(local.questions || []).map(q => (
                  <Card key={q.id} className="p-4 bg-slate-50/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4 space-y-2">
                        <ShadCNInput value={q.title} onChange={e => updateQuestion(q.id, { title: e.target.value })} />
                        <p className="text-xs text-muted-foreground">Type: {q.type.toUpperCase()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <ShadCNInput type="number" value={q.marks || 1} onChange={e => updateQuestion(q.id, {marks: parseInt(e.target.value) || 1})} className="w-16 text-center" />
                         <Label className="text-xs">Marks</Label>
                        <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeQuestion(q.id)}><Trash2 size={16} /></Button>
                      </div>
                    </div>
                    {(q.type === 'mcq' || q.type === 'multi') && (
                      <div className="mt-4 space-y-2">
                        {(q.choices || []).map((c, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <ShadCNInput value={c} onChange={e => updateQuestion(q.id, { choices: (q.choices || []).map((ch, idx) => idx === i ? e.target.value : ch) })} />
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => updateQuestion(q.id, { choices: [...(q.choices || []), 'New Option'] })} className="mt-2 gap-2"><Plus size={14} />Add Option</Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Tools & Settings */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Question</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => addQuestion('mcq')}>MCQ</Button>
                <Button variant="outline" onClick={() => addQuestion('numeric')}>Numeric</Button>
                <Button variant="outline" onClick={() => addQuestion('coding')}>Coding</Button>
                <Button variant="outline" onClick={() => addQuestion('long')}>Essay</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <ShadCNInput id="duration" type="number" value={local.durationMin || 30} onChange={e => setLocal({ ...local, durationMin: Number(e.target.value) })} />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Assessment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
