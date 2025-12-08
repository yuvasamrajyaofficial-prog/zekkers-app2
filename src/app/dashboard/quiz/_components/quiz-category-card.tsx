
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface QuizCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


export const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.05 }}
        className="p-4 rounded-xl bg-white border shadow-card hover:shadow-card-hover transition-all cursor-pointer flex flex-col items-center text-center"
    >
        <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-3">
            {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8" })}
        </div>
        <h3 className="font-bold text-sm text-navy">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </motion.div>
  );
};
