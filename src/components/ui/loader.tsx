'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Z_PATH = "M 20 20 H 80 L 20 80 H 80";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 }
    }
  }
};

export function ZLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <motion.svg width="100" height="100" viewBox="0 0 100 100" initial="hidden" animate="visible" className="text-primary">
            <motion.path
                d={Z_PATH}
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                variants={draw}
            />
        </motion.svg>
        <span className='font-semibold text-lg text-slate-500'>Loading...</span>
    </div>
  );
}

export default ZLoader;
