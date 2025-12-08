'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, PlusCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import { useUser } from '@/firebase';
import ZLoader from '@/components/ui/loader';

interface WorkspaceSidebarProps {
  isCollapsed: boolean;
  activeWorkspaceId: string | null;
  setActiveWorkspaceId: (id: string | null) => void;
}

export function WorkspaceSidebar({ isCollapsed, activeWorkspaceId, setActiveWorkspaceId }: WorkspaceSidebarProps) {
  const { user } = useUser();
  const { workspaces, loading, createWorkspace } = useWorkspaces(user?.uid);
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('');

  const handleCreateWorkspace = async () => {
    if (newWorkspaceTitle.trim() && user) {
        try {
            const newId = await createWorkspace(newWorkspaceTitle);
            setActiveWorkspaceId(newId);
            setNewWorkspaceTitle('');
        } catch (error) {
            console.error("Failed to create workspace:", error);
            // Optionally, show a toast notification
        }
    }
  }


  return (
    <div className="flex flex-col h-full">
      <div className={cn(
          "p-4 border-b",
          isCollapsed && "p-2"
      )}>
        <h2 className={cn(
            "text-lg font-bold flex items-center gap-2",
            isCollapsed && "justify-center"
        )}>
          <Book size={20} />
          {!isCollapsed && 'My Workspaces'}
        </h2>
        {!isCollapsed && (
            <div className="relative mt-3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
            </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {loading && <div className="flex justify-center p-4"><ZLoader/></div>}
          {!loading && workspaces.map((ws, index) => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspaceId(ws.id)}
              className={cn(
                  "w-full text-left p-2 rounded-md text-sm transition-colors",
                  ws.id === activeWorkspaceId ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-100',
                  isCollapsed && "flex justify-center"
              )}
            >
              {isCollapsed ? <Book size={18}/> : (
                  <>
                    <div className="truncate">{ws.title}</div>
                    <div className={`text-xs ${ws.id === activeWorkspaceId ? 'text-primary/80' : 'text-muted-foreground'}`}>
                        {ws.updatedAt ? new Date(ws.updatedAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                    </div>
                  </>
              )}
            </button>
          ))}
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-2 border-t">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="New workspace title..." 
              value={newWorkspaceTitle}
              onChange={(e) => setNewWorkspaceTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateWorkspace()}
            />
            <Button onClick={handleCreateWorkspace} size="icon" className="shrink-0">
              <PlusCircle size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
