
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CompliancePage() {
    const { toast } = useToast();

    const handleDownload = () => {
        toast({ title: "Downloading Templates (Mock)", description: "This would start a download of compliance document templates." });
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText /> Compliance & Legal</CardTitle>
            <CardDescription>Manage and upload your organization's legal and compliance documents.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">Compliance Document Hub</h3>
                <p className="text-sm text-slate-500 mt-1">
                    A secure vault for uploading and managing 80G, 12A, FCRA, and other legal documents will be built here.
                </p>
                 <Button className="mt-4 gap-2" onClick={handleDownload}><Download size={16}/> Download Templates</Button>
            </div>
        </CardContent>
    </Card>
  );
}
