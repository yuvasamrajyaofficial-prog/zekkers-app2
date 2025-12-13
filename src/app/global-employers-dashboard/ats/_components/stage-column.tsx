'use client';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import { AtsCandidate, AtsStage } from '@/types/ats';

interface StageColumnProps {
  stage: AtsStage;
  candidates: AtsCandidate[];
  children: React.ReactNode;
}

export const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  candidates,
  children,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: stage.id,
  });

  const style = {
    backgroundColor: isOver ? 'hsl(var(--primary) / 0.05)' : undefined,
    borderColor: isOver ? 'hsl(var(--primary))' : 'hsl(var(--border))',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-72 min-h-[200px] bg-slate-50 rounded-xl border-2 border-dashed transition-colors flex flex-col flex-shrink-0"
    >
      <div className="p-3 border-b">
        <h3 className="font-bold flex items-center gap-2">
          {stage.title}
          <Badge variant="secondary">{candidates.length}</Badge>
        </h3>
      </div>
      <div className="p-2 space-y-2 overflow-y-auto flex-1">
        {children}
      </div>
    </div>
  );
};
