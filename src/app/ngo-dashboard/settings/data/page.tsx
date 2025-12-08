
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, Download, Database, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DataPage() {
    const { toast } = useToast();

    const handleExport = () => {
        toast({ title: "Export Started", description: "Your data export is being generated and will be emailed to you." });
    };

    const handleBackup = () => {
        toast({ title: "Backup Scheduled", description: "A full backup has been scheduled for tonight." });
    };
    
    const handleDelete = () => {
        // This should open a confirmation modal in a real app
        alert("This is a destructive action. Are you sure you want to delete all data? (This is a mock confirmation)");
    };

  return (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><FolderKanban /> Data Management</CardTitle>
            <CardDescription>Manage your organization's data, exports, and backups.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Data Export</CardTitle>
                    <CardDescription>Export your participants, placements, or program data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="gap-2" onClick={handleExport}><Download size={16}/> Export All Data</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Backups</CardTitle>
                    <CardDescription>Schedule and download database backups.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="gap-2" variant="outline" onClick={handleBackup}><Database size={16}/> Schedule Backups</Button>
                </CardContent>
            </Card>
             <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Actions in this area cannot be undone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="gap-2" variant="destructive" onClick={handleDelete}><Trash2 size={16}/> Delete All Data</Button>
                </CardContent>
            </Card>
        </CardContent>
    </Card>
  );
}
