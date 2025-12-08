'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DataPage() {
    const { toast } = useToast();

    const handleExport = () => {
        toast({ title: "Export Started", description: "Your data export is being generated and will be emailed to you." });
    };

    const handleDelete = () => {
        // This should open a confirmation modal in a real app
        alert("This is a destructive action. Are you sure you want to request data deletion? (This is a mock confirmation)");
    };

  return (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><FolderKanban /> Data Management</CardTitle>
            <CardDescription>Manage your organization's data, exports, and deletion requests.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Data Export</CardTitle>
                    <CardDescription>Export all your company data, including jobs, candidates, and reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="gap-2" onClick={handleExport}><Download size={16}/> Export All Organization Data</Button>
                </CardContent>
            </Card>
             <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                    <CardDescription>This action is irreversible and will permanently delete all your organization's data from Zekkers in accordance with GDPR.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="gap-2" variant="destructive" onClick={handleDelete}><Trash2 size={16}/> Request Data Deletion</Button>
                </CardContent>
            </Card>
        </CardContent>
    </Card>
  );
}
