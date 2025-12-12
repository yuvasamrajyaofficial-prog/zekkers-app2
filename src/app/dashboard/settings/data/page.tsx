'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Database } from 'lucide-react';

export default function DataSettingsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data & Documents</h1>
        <p className="text-muted-foreground">Manage your personal data and uploaded documents.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Download className="h-5 w-5" /> Download Your Data</CardTitle>
            <CardDescription>Get a copy of your data stored on our servers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
                You can request a download of your personal information, including your profile details, application history, and activity logs.
                We will email you a link to download your archive when it is ready.
            </p>
            <Button variant="outline">Request Data Archive</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Manage Documents</CardTitle>
            <CardDescription>View and delete documents you have uploaded.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="border rounded-md divide-y">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded" />
                        <div>
                            <p className="font-medium text-sm">Resume_2024.pdf</p>
                            <p className="text-xs text-muted-foreground">Uploaded on May 15, 2024 • 2.4 MB</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Download</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Delete</Button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded" />
                        <div>
                            <p className="font-medium text-sm">Cover_Letter_Google.docx</p>
                            <p className="text-xs text-muted-foreground">Uploaded on May 10, 2024 • 1.1 MB</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Download</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Delete</Button>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
