
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Save, Share2, PanelLeft, PanelRight, Loader } from 'lucide-react';

interface CanvasEditorProps {
  workspaceTitle?: string;
  onWorkspaceToggle: () => void;
  onContextToggle: () => void;
  onLeftSidebarToggle: () => void;
  onRightSidebarToggle: () => void;
  answer: string;
  loading: boolean;
}

export function CanvasEditor({ 
    workspaceTitle,
    onWorkspaceToggle, 
    onContextToggle,
    onLeftSidebarToggle,
    onRightSidebarToggle,
    answer,
    loading,
}: CanvasEditorProps) {
  const [noteContent, setNoteContent] = React.useState('<p>Start your notes...</p>');
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-2 md:p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onWorkspaceToggle}>
                <PanelLeft size={18} />
            </Button>
             <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={onLeftSidebarToggle}>
                <PanelLeft size={18} />
            </Button>
            <h3 className="text-lg md:text-xl font-bold truncate">{workspaceTitle || 'Select a Workspace'}</h3>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2"><Save size={16}/> Save</Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2"><Share2 size={16}/> Share</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onContextToggle}>
                <PanelRight size={18} />
            </Button>
             <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={onRightSidebarToggle}>
                <PanelRight size={18} />
            </Button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-slate max-w-none">

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2"><Bot size={18}/> AI Answer</h4>
            <div className="p-4 border rounded-lg min-h-[120px] bg-slate-50/50">
              {loading && <div className="flex items-center gap-2 text-muted-foreground"><Loader className="animate-spin w-4 h-4"/> {answer}</div>}
              {!loading && answer && <div className="text-sm">{answer}</div>}
              {!loading && !answer && <div className="text-sm text-muted-foreground">Ask the AI a question using the input below.</div>}
            </div>
          </div>
        
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Canvas</h4>
            <Textarea
              placeholder="Type your notes here..."
              className="mt-4 min-h-[400px] text-base"
              rows={15}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
