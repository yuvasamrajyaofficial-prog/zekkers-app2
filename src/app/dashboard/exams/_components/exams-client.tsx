'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { Exam } from '@/lib/exams';
import { motion } from 'framer-motion';
import { ExamCard } from '../../mock-tests/_components/exam-card';
import { FiltersPanel } from '../../mock-tests/_components/filters-panel';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExamsClientProps {
  exams: Exam[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const initialFilters = {
  category: 'all',
  year: 'all',
  language: 'all',
};

export default function ExamsClient({ exams }: ExamsClientProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  
  const nonMockExams = useMemo(() => exams.filter(e => e.category !== 'Mock'), [exams]);

  const uniqueYears = useMemo(() => Array.from(new Set(nonMockExams.map(e => e.year).filter((y): y is number => !!y))).sort((a, b) => b - a), [nonMockExams]);
  const uniqueLanguages = useMemo(() => Array.from(new Set(nonMockExams.flatMap(e => e.language).filter((l): l is string => !!l))), [nonMockExams]);

  const filteredExams = useMemo(() => {
    return nonMockExams.filter(exam => {
      const searchMatch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = filters.category === 'all' || exam.category === filters.category;
      const yearMatch = filters.year === 'all' || (exam.year ? exam.year === parseInt(filters.year) : true);
      const languageMatch = filters.language === 'all' || exam.language?.includes(filters.language);
      
      return searchMatch && categoryMatch && yearMatch && languageMatch;
    });
  }, [nonMockExams, filters, searchQuery]);

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setSearchQuery('');
  }, []);

  return (
    <div>
        <FiltersPanel 
            filters={filters}
            searchQuery={searchQuery}
            onFilterChange={setFilters}
            onSearchChange={setSearchQuery}
            onReset={handleReset}
            uniqueYears={uniqueYears}
            uniqueLanguages={uniqueLanguages}
        />

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">
                Available Exams ({filteredExams.length})
            </h2>
            <div className="flex items-center gap-2">
                <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')}>
                    <LayoutGrid className="w-5 h-5" />
                </Button>
                <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')}>
                    <List className="w-5 h-5" />
                </Button>
            </div>
        </div>

      {filteredExams.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-slate-50 rounded-lg">
          <p>No exams found matching your criteria.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={layout === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }
        >
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
