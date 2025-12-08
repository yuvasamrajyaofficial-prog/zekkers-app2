
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  slug: string;
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

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  color,
  slug,
}) => {
  return (
    <Link href={`/dashboard/study-materials/${slug}`} className="group">
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-2xl bg-white border shadow-card hover:shadow-card-hover transition-all cursor-pointer flex flex-col h-full"
        >
            <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}1A`, color: color }}>
                {icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
            </div>
            <div className="mt-4 flex-1">
                <h3 className="font-bold text-lg text-slate-800">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
        </motion.div>
    </Link>
  );
};
