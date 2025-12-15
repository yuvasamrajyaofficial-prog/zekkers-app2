'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GlobalOpportunitiesVisual = () => {
  // Rough coordinates for regions to simulate a world map layout
  const regions = [
    { id: 'na', x: '20%', y: '30%', label: '🇺🇸', delay: 0 }, // North America
    { id: 'eu', x: '48%', y: '25%', label: '🇬🇧', delay: 0.5 }, // Europe
    { id: 'as', x: '75%', y: '35%', label: '🇮🇳', delay: 1 }, // Asia
    { id: 'sa', x: '28%', y: '65%', label: '🇧🇷', delay: 1.5 }, // South America
    { id: 'af', x: '52%', y: '55%', label: '🇿🇦', delay: 2 }, // Africa
    { id: 'au', x: '85%', y: '75%', label: '🇦🇺', delay: 2.5 }, // Australia
  ];

  return (
    <div className="mt-6 relative h-48 rounded-xl bg-slate-950/50 border border-white/5 overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* World Map Container */}
      <div className="relative w-full h-full">
        
        {/* Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            {/* NA to EU */}
            <motion.path 
                d="M 20 30 Q 35 10 48 25" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            />
            {/* EU to Asia */}
            <motion.path 
                d="M 48 25 Q 60 15 75 35" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
             {/* NA to SA */}
             <motion.path 
                d="M 20 30 Q 15 50 28 65" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
             {/* EU to Africa */}
             <motion.path 
                d="M 48 25 Q 50 40 52 55" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            {/* Asia to Aus */}
            <motion.path 
                d="M 75 35 Q 80 55 85 75" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>

        {/* Region Nodes */}
        {regions.map((region) => (
            <div 
                key={region.id}
                className="absolute"
                style={{ left: region.x, top: region.y }}
            >
                {/* Pulse Effect */}
                <motion.div
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: region.delay }}
                    className="absolute -inset-2 rounded-full bg-blue-500/30"
                />
                
                {/* Dot */}
                <div className="relative w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

                {/* Floating Label */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: region.delay, times: [0, 0.1, 0.8, 1] }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/10 text-[10px] backdrop-blur-sm whitespace-nowrap"
                >
                    {region.label}
                </motion.div>
            </div>
        ))}

        {/* Floating "Active Jobs" Badge */}
        <motion.div 
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2 backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
        >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-medium text-blue-300">Live in 54+ Countries</span>
        </motion.div>

      </div>
    </div>
  );
};
