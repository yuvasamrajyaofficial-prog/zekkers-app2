'use client';
import React, { useState, useMemo } from 'react';
import { WorkspaceSidebar } from './_components/workspace-sidebar';
import { CanvasEditor } from './_components/canvas-editor';
import { ContextPanel } from './_components/context-panel';
import { ChatInput } from './_components/chat-input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import { useUser } from '@/firebase';
import { generateAnswer } from './actions';


export default function StudyAIPage() {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  const { user } = useUser();
  const { workspaces } = useWorkspaces(user?.uid);

  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);


  const activeWorkspace = useMemo(() => {
    return workspaces.find(ws => ws.id === activeWorkspaceId);
  }, [workspaces, activeWorkspaceId]);

  React.useEffect(() => {
    if (!activeWorkspaceId && workspaces.length > 0) {
      setActiveWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, activeWorkspaceId, setActiveWorkspaceId]);

  const handleQuery = async () => {
    if (!prompt || !activeWorkspaceId) return;
    setLoading(true);
    setAnswer("Generating...");

    try {
      const result = await generateAnswer(prompt);
      setAnswer(result);
    } catch (error: any) {
        console.error("Error calling generate function:", error);
        setAnswer(`Error: ${error.message}`);
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white overflow-hidden">
      {/* Main 3-pane layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Workspace List (Desktop) */}
        <aside className={cn(
            "border-r bg-slate-50/50 hidden lg:flex flex-col transition-all duration-300",
            isLeftSidebarCollapsed ? 'w-[50px]' : 'w-1/4 max-w-xs'
        )}>
          <WorkspaceSidebar 
            isCollapsed={isLeftSidebarCollapsed}
            activeWorkspaceId={activeWorkspaceId}
            setActiveWorkspaceId={setActiveWorkspaceId}
          />
        </aside>

        {/* Left Pane: Workspace List (Mobile) */}
        <Sheet open={isWorkspaceOpen} onOpenChange={setIsWorkspaceOpen}>
          <SheetContent side="left" className="p-0 w-[80vw] sm:w-[320px] flex flex-col">
             <SheetHeader className="p-4 border-b">
              <SheetTitle>Workspaces</SheetTitle>
              <SheetDescription>
                Browse and manage your study workspaces.
              </SheetDescription>
            </SheetHeader>
            <WorkspaceSidebar 
                isCollapsed={false}
                activeWorkspaceId={activeWorkspaceId}
                setActiveWorkspaceId={(id) => {
                    setActiveWorkspaceId(id);
                    setIsWorkspaceOpen(false);
                }}
            />
          </SheetContent>
        </Sheet>


        {/* Center Pane: Canvas / Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <CanvasEditor
            workspaceTitle={activeWorkspace?.title}
            onWorkspaceToggle={() => setIsWorkspaceOpen(true)}
            onContextToggle={() => setIsContextOpen(true)}
            onLeftSidebarToggle={() => setIsLeftSidebarCollapsed(prev => !prev)}
            onRightSidebarToggle={() => setIsRightSidebarCollapsed(prev => !prev)}
            answer={answer}
            loading={loading}
          />
        </main>

        {/* Right Pane: Context / Previews (Desktop) */}
        <aside className={cn(
            "border-l bg-slate-50/50 hidden lg:flex flex-col transition-all duration-300",
            isRightSidebarCollapsed ? 'w-[50px]' : 'w-1/4 max-w-xs'
        )}>
          <ContextPanel isCollapsed={isRightSidebarCollapsed}/>
        </aside>

        {/* Right Pane: Context / Previews (Mobile) */}
        <Sheet open={isContextOpen} onOpenChange={setIsContextOpen}>
          <SheetContent side="right" className="p-0 w-[80vw] sm:w-[320px] flex flex-col">
             <SheetHeader className="p-4 border-b">
              <SheetTitle>Context & Sources</SheetTitle>
              <SheetDescription>
                View document sources, previews, and history for your current workspace.
              </SheetDescription>
            </SheetHeader>
            <ContextPanel isCollapsed={false}/>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Input Area */}
      <div className="border-t p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onQuery={handleQuery}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
