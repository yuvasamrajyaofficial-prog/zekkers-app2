
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Presentation,
  CheckSquare,
  BadgeHelp,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const resourceCategories = [
  {
    title: 'Templates & Documents',
    icon: <FileText className="w-6 h-6 text-primary" />,
    items: [
      { name: 'CSR Proposal Template.docx', size: '1.2 MB' },
      { name: 'Monthly Donor Report.xlsx', size: '450 KB' },
      { name: 'Beneficiary Onboarding Form.pdf', size: '300 KB' },
    ],
  },
  {
    title: 'Training & Skilling Materials',
    icon: <Presentation className="w-6 h-6 text-primary" />,
    items: [
      { name: 'Digital Literacy Module 1.pdf', size: '5.6 MB' },
      { name: 'Retail Skills Handbook.pdf', size: '8.2 MB' },
      { name: 'IT Support Course Videos.zip', size: '1.2 GB' },
    ],
  },
  {
    title: 'Guides & Best Practices',
    icon: <BadgeHelp className="w-6 h-6 text-primary" />,
    items: [
      { name: 'Employer Partnership Guide.pdf', size: '2.1 MB' },
      { name: 'Impact Measurement Framework.pdf', size: '3.5 MB' },
    ],
  },
  {
    title: 'Compliance & Legal',
    icon: <CheckSquare className="w-6 h-6 text-primary" />,
    items: [
      { name: 'FCRA Compliance Checklist.pdf', size: '500 KB' },
      { name: 'Data Privacy Policy (for Beneficiaries).pdf', size: '250 KB' },
    ],
  },
];

const ResourceItem = ({ name, size }: { name: string; size: string }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <FileText className="w-5 h-5 text-muted-foreground" />
      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{size}</p>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="w-8 h-8">
      <Download className="w-4 h-4" />
    </Button>
  </motion.div>
);

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="text-primary" />
                Resource Hub
              </CardTitle>
              <CardDescription className="mt-1">
                Download templates, training materials, and compliance documents.
              </CardDescription>
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search resources..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {resourceCategories.map((category) => (
              <motion.div key={category.title} variants={itemVariants}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                  {category.icon}
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <ResourceItem key={item.name} {...item} />
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
