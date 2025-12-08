
'use client';
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { AtsCandidate, AtsStage, AtsStageId } from '@/types/ats';
import { StageColumn } from './stage-column';
import { CandidateKanbanCard } from './candidate-kanban-card';
import { Candidate } from '@/types/candidate';

interface AtsBoardProps {
  candidates: AtsCandidate[];
  stages: AtsStage[];
}

export const AtsBoard: React.FC<AtsBoardProps> = ({
  candidates: initialCandidates,
  stages,
}) => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [activeCandidate, setActiveCandidate] = useState<AtsCandidate | null>(null);

  React.useEffect(() => {
    setCandidates(initialCandidates);
  }, [initialCandidates]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const candidate = candidates.find(c => c.id === active.id);
    if(candidate) setActiveCandidate(candidate);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCandidate(null);

    if (over && active.id !== over.id) {
      setCandidates((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newStageId = over.id as string; 

        if(oldIndex > -1){
            // Create a new array with the updated item
            const newItems = [...items];
            const movedItem = { ...newItems[oldIndex], status: newStageId as AtsStageId };
            newItems[oldIndex] = movedItem;

            // Optimistically update the UI
            return newItems;
        }

        return items;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter(
            (c) => c.status === stage.id
          );
          return (
            <StageColumn key={stage.id} stage={stage} candidates={stageCandidates}>
              {stageCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <CandidateKanbanCard candidate={candidate} />
                </motion.div>
              ))}
            </StageColumn>
          );
        })}
      </div>
      <DragOverlay>
        {activeCandidate ? <CandidateKanbanCard candidate={activeCandidate} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};
