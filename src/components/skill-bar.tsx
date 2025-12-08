
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="mt-1 bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
