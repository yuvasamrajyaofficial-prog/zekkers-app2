'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export function FloatingActionButton({
  icon = <Plus className="h-6 w-6" />,
  label,
  position = 'bottom-right',
  className,
  ...props
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  };

  return (
    <button
      className={cn(
        'fixed z-50',
        'h-14 min-w-[56px] rounded-full',
        'bg-primary text-primary-foreground',
        'shadow-lg hover:shadow-xl',
        'flex items-center justify-center gap-2',
        'transition-all duration-200 ease-out',
        'hover:scale-105 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'touch-manipulation',
        positionClasses[position],
        label && 'px-6',
        className
      )}
      {...props}
    >
      {icon}
      {label && <span className="font-semibold text-sm">{label}</span>}
    </button>
  );
}
