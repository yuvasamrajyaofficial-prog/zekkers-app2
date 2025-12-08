'use client';
import React, { useState, useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  UploadCloud,
  Search,
  MoreVertical,
  ShieldCheck,
  FileImage,
  FileJson,
  X,
  FileUp,
  FolderKanban,
} from 'lucide-react';
import { Document } from '@/types/document';
import Image from 'next/image';

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    name: 'Prashant_Resume_2024_v3.pdf',
    category: 'Resumes',
    url: '#',
    type: 'application/pdf',
    size: 245000,
    uploadedAt: new Date('2024-07-20T10:00:00Z'),
    aiScore: 92,
    verificationStatus: 'Verified',
  },
  {
    id: 'doc2',
    name: 'BTech_Degree_Certificate.pdf',
    category: 'Education',
    url: '#',
    type: 'application/pdf',
    size: 1200000,
    uploadedAt: new Date('2024-07-15T11:30:00Z'),
    aiScore: 98,
    verificationStatus: 'Verified',
  },
  {
    id: 'doc3',
    name: 'Aadhar_Card_Scan.jpg',
    category: 'ID Proofs',
    url: 'https://picsum.photos/seed/aadhar/400/300',
    type: 'image/jpeg',
    size: 850000,
    uploadedAt: new Date('2024-07-15T11:32:00Z'),
    aiScore: 75,
    verificationStatus: 'Pending',
  },
  {
    id: 'doc4',
    name: 'AWS_Cloud_Practitioner.pdf',
    category: 'Certifications',
    url: '#',
    type: 'application/pdf',
    size: 450000,
    uploadedAt: new Date('2024-06-01T18:00:00Z'),
    aiScore: 95,
    verificationStatus: 'Verified',
  },
    {
    id: 'doc5',
    name: 'Internship_Experience_Letter.pdf',
    category: 'Work Experience',
    url: '#',
    type: 'application/pdf',
    size: 180000,
    uploadedAt: new Date('2023-12-20T14:00:00Z'),
    aiScore: 88,
    verificationStatus: 'Pending',
  },
];

const categoryIcons: { [key: string]: React.ReactNode } = {
    Resumes: <FileText className="w-5 h-5 text-indigo-500" />,
    Education: <FileText className="w-5 h-5 text-blue-500" />,
    'ID Proofs': <FileText className="w-5 h-5 text-green-500" />,
    Certifications: <FileText className="w-5 h-5 text-amber-500" />,
    'Work Experience': <FileText className="w-5 h-5 text-purple-500" />,
    'Visa / International': <FileText className="w-5 h-5 text-red-500" />,
    Other: <FileText className="w-5 h-5 text-slate-500" />,
};

const DocumentCard = ({ doc }: { doc: Document }) => {
  const getFileIcon = () => {
    if (doc.type.startsWith('image/')) {
        return <FileImage className="w-8 h-8 text-slate-400" />;
    }
    if (doc.type === 'application/pdf') {
        return <FileJson className="w-8 h-8 text-red-500" />;
    }
    return <FileText className="w-8 h-8 text-slate-400" />;
  }

  const scoreColor = doc.aiScore > 85 ? 'text-green-600' : doc.aiScore > 60 ? 'text-amber-500' : 'text-red-500';

  return (
    <motion.div
        whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-card-hover)' }}
        className="bg-white p-4 rounded-xl border shadow-card transition-shadow flex flex-col"
    >
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center">
                {getFileIcon()}
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm truncate text-slate-800" title={doc.name}>{doc.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    {categoryIcons[doc.category]}
                    <span className="text-xs text-slate-500">{doc.category}</span>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreVertical className="w-4 h-4" />
            </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex-1 flex flex-col justify-end">
             <div className="flex justify-between items-center text-xs">
                <div className="font-bold ">{(doc.size / 1024).toFixed(1)} KB</div>
                <div className={`font-semibold flex items-center gap-1.5 ${scoreColor}`}>
                   <span className="font-mono text-base">{doc.aiScore}</span>
                   <span className="text-xs">% AI Score</span>
                </div>
             </div>
             {doc.verificationStatus === 'Verified' && (
                <div className="mt-2 text-xs flex items-center gap-1.5 text-blue-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5"/> Zekkers Verified
                </div>
             )}
        </div>
    </motion.div>
  )
};

export default function VaultPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTab, setCurrentTab] = useState('All');
    
    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter(doc => {
            const matchesCategory = currentTab === 'All' || doc.category === currentTab;
            const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
    }, [currentTab, searchQuery]);

  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                           <FolderKanban className="text-primary" />
                            Documents Vault
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Your secure career passport for resumes, certificates, and more.
                        </CardDescription>
                    </div>
                     <Button size="lg">
                        <UploadCloud className="w-5 h-5 mr-2" />
                        Upload Document
                    </Button>
                </div>
                
                <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input 
                        placeholder="Search documents by name..." 
                        className="pl-10 h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                    <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:flex w-full overflow-x-auto h-auto -mx-1">
                        <TabsTrigger value="All">All</TabsTrigger>
                        <TabsTrigger value="Resumes">Resumes</TabsTrigger>
                        <TabsTrigger value="Education">Education</TabsTrigger>
                        <TabsTrigger value="ID Proofs">ID Proofs</TabsTrigger>
                        <TabsTrigger value="Work Experience">Work Experience</TabsTrigger>
                        <TabsTrigger value="Certifications">Certifications</TabsTrigger>
                        <TabsTrigger value="Visa / International">Visa</TabsTrigger>
                    </TabsList>
                    <div className="mt-6">
                         {filteredDocuments.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredDocuments.map(doc => (
                                    <DocumentCard key={doc.id} doc={doc} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                                <FileUp className="w-12 h-12 mx-auto text-slate-400" />
                                <h3 className="mt-4 font-semibold text-lg">No documents found</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {currentTab !== 'All' ? `No documents in the "${currentTab}" category.` : "Start by uploading your first document."}
                                </p>
                            </div>
                        )}
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
