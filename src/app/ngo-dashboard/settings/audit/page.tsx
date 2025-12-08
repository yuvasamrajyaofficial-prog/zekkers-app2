
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AuditPage() {
    const { toast } = useToast();

    const handleExport = () => {
        toast({
            title: "Exporting Logs (Mock)",
            description: "A CSV of the audit logs will be generated and downloaded.",
        });
    };

  return (
    <Card>
        <CardHeader>
             <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><ListOrdered /> Audit Logs</CardTitle>
                    <CardDescription>Track all significant actions taken by users in your organization.</CardDescription>
                </div>
                <Button variant="outline" onClick={handleExport}><Download size={16} className="mr-2"/>Export Logs</Button>
            </div>
        </CardHeader>
        <CardContent>
             <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">Activity Audit Trail</h3>
                <p className="text-sm text-slate-500 mt-1">
                    A filterable, searchable log of all user activities will be displayed here.
                </p>
            </div>
        </CardContent>
    </Card>
  );
}
