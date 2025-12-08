
'use client';
import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  BrainCircuit,
  Database,
  UserCheck,
  Search,
  Lightbulb,
  MapPin,
  GitCommitHorizontal,
  GitBranch,
  User,
  Bot
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Node Component
const FlowNode = React.forwardRef<
  HTMLDivElement,
  {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }
>(({ icon, title, subtitle, children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-slate-800/80 border border-slate-700 rounded-lg p-3 shadow-lg backdrop-blur-sm text-center cursor-grab active:cursor-grabbing",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-center gap-2">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="font-bold text-sm text-slate-100">{title}</div>
        <div className="text-xs text-slate-400">{subtitle}</div>
      </div>
    </div>
    {children}
  </div>
));
FlowNode.displayName = 'FlowNode';


const DraggableNode = ({ id, node, position }: { id: string, node: any, position: {x: number, y: number} }) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({ id });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={{...style, position: 'absolute', left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)'}}
            {...listeners}
            {...attributes}
        >
            <FlowNode {...node} />
        </div>
    );
};


const initialNodes = {
    'user-goal': {
        icon: <UserCheck size={20}/>,
        title: "User's Goal",
        subtitle: "e.g., 'SDE in Germany'",
        position: { x: 15, y: 50 }
    },
    'ai-agent': {
        icon: <Bot size={20}/>,
        title: "AI Roadmap Agent",
        subtitle: "Generates skill path",
        children: <div className="mt-2 flex justify-center gap-2"><Badge variant="secondary">Analysis</Badge><Badge variant="secondary">Planning</Badge></div>,
        position: { x: 50, y: 50 }
    },
    'roadmap': {
        icon: <GitCommitHorizontal size={20}/>,
        title: "Personalized Roadmap",
        subtitle: "Generated step-by-step plan",
        position: { x: 85, y: 50 }
    },
    'database': {
        icon: <Database size={18}/>,
        title: "Job & Skill Database",
        subtitle: "Market Data",
        position: { x: 50, y: 15 }
    },
    'learning-model': {
        icon: <BrainCircuit size={18}/>,
        title: "Learning Model",
        subtitle: "Suggests resources",
        position: { x: 50, y: 85 }
    }
};

const StaticConnector = ({ from, to }: { from: {x:number, y:number}, to: {x:number, y:number} }) => (
    <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none">
        <line
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke="hsl(var(--border))"
            strokeWidth="2"
        />
    </svg>
);


export const RoadmapVisual = () => {
  const [nodePositions, setNodePositions] = useState(initialNodes);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, delta} = event;
    const id = active.id as keyof typeof nodePositions;

    setNodePositions(prev => {
        const container = document.querySelector('.diagram-container');
        if (!container) return prev;
        
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        if (containerWidth === 0 || containerHeight === 0) return prev;

        const newPos = {
            x: prev[id].position.x + (delta.x / containerWidth) * 100,
            y: prev[id].position.y + (delta.y / containerHeight) * 100
        };
        return {
            ...prev,
            [id]: {
                ...prev[id],
                position: {
                    x: Math.max(5, Math.min(95, newPos.x)),
                    y: Math.max(5, Math.min(95, newPos.y))
                }
            }
        }
    });
  };

  const featureItems = [
    { icon: <GitBranch />, title: 'AI Goal Analysis' },
    { icon: <User />, title: 'User Profile Parsing' },
    { icon: <Search />, title: 'Job Market Data' },
    { icon: <Lightbulb />, title: 'Skill Gap Detection' },
    { icon: <MapPin />, title: 'Location Targeting' },
  ];

  return (
    <div className="mt-6">
      <div
        className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-8 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
          backgroundSize: '2rem 2rem',
        }}
      >
        {/* Left Features Panel */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {featureItems.map((item) => (
            <div key={item.title} className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center gap-3">
              <div className="text-primary">{item.icon}</div>
              <span className="font-semibold text-sm">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Right Flow Diagram */}
        <DndContext onDragEnd={handleDragEnd}>
            <div className="lg:col-span-2 relative min-h-[350px] md:min-h-[400px] diagram-container">
                {/* Static Connectors */}
                <StaticConnector from={nodePositions['user-goal'].position} to={nodePositions['ai-agent'].position} />
                <StaticConnector from={nodePositions['ai-agent'].position} to={nodePositions['roadmap'].position} />
                <StaticConnector from={nodePositions['database'].position} to={nodePositions['ai-agent'].position} />
                <StaticConnector from={nodePositions['learning-model'].position} to={nodePositions['ai-agent'].position} />

                {/* Draggable Nodes */}
                {Object.entries(nodePositions).map(([id, node]) => (
                    <DraggableNode key={id} id={id} node={node} position={node.position}/>
                ))}
            </div>
        </DndContext>
      </div>
    </div>
  );
};
