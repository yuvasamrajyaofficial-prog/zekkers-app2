
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Repeat, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AutomationPage() {
    const { toast } = useToast();

    const handleCreate = () => {
        toast({
            title: "Create Automation Rule (Mock)",
            description: "This would open a workflow builder UI.",
        });
    };

  return (
    <Card>
        <CardHeader>
             <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><Repeat /> Automation Rules</CardTitle>
                    <CardDescription>Automate your workflows to save time and reduce manual effort.</CardDescription>
                </div>
                <Button onClick={handleCreate}><PlusCircle size={16} className="mr-2"/>Create Rule</Button>
            </div>
        </CardHeader>
        <CardContent>
             <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">Automation Workflow Builder</h3>
                <p className="text-sm text-slate-500 mt-1">
                    A "if this, then that" style rule builder will be available here.
                </p>
            </div>
        </CardContent>
    </Card>
  );
}
