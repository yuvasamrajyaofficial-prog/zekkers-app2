
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProgramsConfigPage() {
    const { toast } = useToast();
    
    const handleNewProgramType = () => {
        toast({
            title: "New Program Type (Mock)",
            description: "This would open a form to define a new program category.",
        });
    };

  return (
    <Card>
        <CardHeader>
             <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><BookOpen /> Program Configuration</CardTitle>
                    <CardDescription>Set defaults and manage metadata for your training programs.</CardDescription>
                </div>
                <Button onClick={handleNewProgramType}><PlusCircle size={16} className="mr-2"/>New Program Type</Button>
            </div>
        </CardHeader>
        <CardContent>
             <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">Program Configuration</h3>
                <p className="text-sm text-slate-500 mt-1">
                    Forms for managing program metadata and defaults will be available here.
                </p>
            </div>
        </CardContent>
    </Card>
  );
}
