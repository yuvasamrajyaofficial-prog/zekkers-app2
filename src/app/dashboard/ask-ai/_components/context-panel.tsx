
'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, History, Link2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ContextPanel({ isCollapsed }: { isCollapsed: boolean }) {
  if (isCollapsed) {
    return (
        <div className="flex flex-col items-center gap-4 p-2 border-t h-full mt-4">
            <Button variant="ghost" size="icon"><FileText size={18}/></Button>
            <Button variant="ghost" size="icon"><History size={18}/></Button>
            <Button variant="ghost" size="icon"><Link2 size={18}/></Button>
        </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="sources" className="flex-1 flex flex-col overflow-hidden">
        <div className="p-2 border-b">
            <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="previews">Preview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
        </div>
        <div className="flex-1 overflow-y-auto">
            <TabsContent value="sources" className="p-4 space-y-4 m-0">
            <Button variant="outline" className="w-full gap-2">
                <UploadCloud size={16}/> Upload Document
            </Button>
            <div className="p-3 border rounded-lg bg-white">
                <p className="font-semibold text-sm flex items-center gap-2"><FileText size={16} className="text-blue-500"/> ancient_history.pdf</p>
                <p className="text-xs text-muted-foreground mt-1">Source for "AI Summary".</p>
            </div>
            <div className="p-3 border rounded-lg bg-white">
                <p className="font-semibold text-sm flex items-center gap-2"><Link2 size={16} className="text-green-500"/> Wikipedia</p>
                <p className="text-xs text-muted-foreground mt-1">Source for "Key Features".</p>
            </div>
            </TabsContent>
            <TabsContent value="previews" className="p-4 m-0">
                <div className="h-full border-2 border-dashed rounded-lg flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Select a source to preview.</p>
                </div>
            </TabsContent>
            <TabsContent value="history" className="p-4 space-y-2 m-0">
                <div className="p-2 border rounded-md bg-white">
                    <p className="text-xs font-medium truncate">"Summarize the Indus Valley Civilization"</p>
                    <p className="text-xs text-muted-foreground">2 min ago</p>
                </div>
                 <div className="p-2 border rounded-md bg-white">
                    <p className="text-xs font-medium truncate">"List key features"</p>
                    <p className="text-xs text-muted-foreground">5 min ago</p>
                </div>
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
