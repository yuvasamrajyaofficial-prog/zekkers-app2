'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, FileCheck, ShieldCheck, Check } from 'lucide-react';

export const VerificationAnimation = () => {
  return (
    <div className="mt-6 relative h-48 rounded-xl bg-slate-950/50 border border-white/5 overflow-hidden flex items-center justify-center p-4">
      {/* Background Grid/Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="relative z-10 w-full max-w-sm">
        {/* Connection Line Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 rounded-full" />
        
        {/* Animated Connection Line */}
        <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 -translate-y-1/2 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        />

        <div className="relative flex justify-between items-center">
            {/* Step 1: Email */}
            <Step 
                icon={Mail} 
                label="Email" 
                delay={0} 
                color="text-blue-400"
                bgColor="bg-blue-500/20"
                borderColor="border-blue-500/50"
            />

            {/* Step 2: Details */}
            <Step 
                icon={Building2} 
                label="Company" 
                delay={1.3} 
                color="text-indigo-400"
                bgColor="bg-indigo-500/20"
                borderColor="border-indigo-500/50"
            />

            {/* Step 3: KYC */}
            <Step 
                icon={FileCheck} 
                label="KYC" 
                delay={2.6} 
                color="text-purple-400"
                bgColor="bg-purple-500/20"
                borderColor="border-purple-500/50"
            />

            {/* Step 4: Verified */}
            <div className="relative">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                    transition={{ delay: 4, duration: 0.5 }}
                    className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20 relative"
                >
                    <ShieldCheck className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.2 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-400 whitespace-nowrap"
                >
                    VERIFIED
                </motion.div>
                
                {/* Pulse Effect */}
                <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 4.5 }}
                    className="absolute inset-0 rounded-full bg-green-500/50 z-10"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ icon: Icon, label, delay, color, bgColor, borderColor }: any) => {
    return (
        <div className="relative flex flex-col items-center gap-2">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay, duration: 0.3 }}
                className={`w-10 h-10 rounded-full ${bgColor} border ${borderColor} flex items-center justify-center backdrop-blur-sm z-10 relative`}
            >
                <Icon className={`w-5 h-5 ${color}`} />
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.5 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center"
                >
                    <Check className="w-2.5 h-2.5 text-green-500" />
                </motion.div>
            </motion.div>
            <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.2 }}
                className="text-[10px] font-medium text-slate-400 absolute -bottom-5"
            >
                {label}
            </motion.span>
        </div>
    );
};
