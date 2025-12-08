
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Sparkles,
  Users,
  MessageCircle,
  Lightbulb,
  CheckCircle,
  XCircle,
  BrainCircuit,
} from 'lucide-react';
import { MOCK_GLOBAL_CANDIDATES, GlobalCandidate } from '@/types/global-candidate';
import { Gauge } from '@/components/analytics/Gauge';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// --- Animation Variants ---
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

// --- Mock AI Analysis ---
interface AnalysisResult {
    score: number;
    summary: string;
    traitAnalysis: {
        trait: string;
        alignment: 'High' | 'Medium' | 'Low';
        evidence: string;
    }[];
    suggestedQuestions: string[];
}

const mockAnalysis = (values: string[]): AnalysisResult => {
    const score = 60 + Math.floor(Math.random() * 35);
    return {
        score,
        summary: "The candidate shows strong alignment with 'Collaboration' and 'Ownership' based on their project history. However, their resume lacks evidence of rapid 'Innovation' cycles.",
        traitAnalysis: values.map(trait => {
            const r = Math.random();
            return {
                trait,
                alignment: r > 0.66 ? 'High' : r > 0.33 ? 'Medium' : 'Low',
                evidence: `Resume mentions leading a team project ('${trait}').`
            }
        }),
        suggestedQuestions: [
            "Tell me about a time you had to adapt to a sudden change in a project's direction. How did you handle it?",
            "Describe a project you are particularly proud of. What was your specific contribution to its success?",
            "How do you prefer to collaborate with team members who have different working styles?",
        ]
    };
};

// --- Main Component ---
export default function CulturalFitAnalyzerPage() {
    const [companyValues, setCompanyValues] = useState('Innovation, Collaboration, Customer-Centric, Ownership, Transparency');
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | undefined>(MOCK_GLOBAL_CANDIDATES[0].id);
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const { toast } = useToast();

    const handleAnalyze = () => {
        if (!selectedCandidateId) {
            toast({ title: "Please select a candidate", variant: 'destructive' });
            return;
        }
        setLoading(true);
        setAnalysisResult(null);
        setTimeout(() => {
            const values = companyValues.split(',').map(v => v.trim()).filter(Boolean);
            setAnalysisResult(mockAnalysis(values));
            setLoading(false);
        }, 1500);
    };

    const alignmentColors = {
        High: 'text-green-600 bg-green-100',
        Medium: 'text-amber-600 bg-amber-100',
        Low: 'text-red-600 bg-red-100',
    };

    return (
        <div className="p-4 md:p-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center gap-3"><BrainCircuit className="text-primary"/> AI Cultural Fit Analyzer</CardTitle>
                        <CardDescription>Evaluate candidate alignment with your company values using AI-powered analysis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Inputs */}
                            <div className="space-y-4 p-4 border rounded-lg bg-slate-50/50">
                                <div className="space-y-2">
                                    <Label htmlFor="company-values">Your Company's Core Values (comma-separated)</Label>
                                    <Textarea id="company-values" value={companyValues} onChange={(e) => setCompanyValues(e.target.value)} placeholder="e.g., Innovation, Collaboration, Ownership..." rows={3}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="candidate-select">Select Candidate to Analyze</Label>
                                    <Select value={selectedCandidateId} onValueChange={setSelectedCandidateId}>
                                        <SelectTrigger id="candidate-select"><SelectValue placeholder="Select a candidate..." /></SelectTrigger>
                                        <SelectContent>
                                            {MOCK_GLOBAL_CANDIDATES.map(c => <SelectItem key={c.id} value={c.id}>{c.name} - {c.role}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleAnalyze} disabled={loading} className="w-full gap-2">
                                    <Sparkles size={16}/> {loading ? 'Analyzing...' : 'Analyze Fit'}
                                </Button>
                            </div>
                            
                            {/* Results */}
                            <div className="p-4">
                                {!analysisResult && !loading && (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground bg-slate-50 rounded-lg border-2 border-dashed">
                                        <BrainCircuit size={48} className="opacity-30"/>
                                        <p className="mt-4 font-semibold">Your analysis results will appear here.</p>
                                    </div>
                                )}
                                {loading && (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                                        <Sparkles size={48} className="animate-pulse text-primary"/>
                                        <p className="mt-4 font-semibold">AI is analyzing the candidate's profile...</p>
                                    </div>
                                )}
                                {analysisResult && (
                                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-center">Cultural Fit Score</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center">
                                                <Gauge value={analysisResult.score} />
                                                <p className="text-center text-sm mt-4 text-muted-foreground">{analysisResult.summary}</p>
                                            </CardContent>
                                        </Card>
                                         <Card>
                                            <CardHeader><CardTitle>Trait Analysis</CardTitle></CardHeader>
                                            <CardContent className="space-y-2">
                                                {analysisResult.traitAnalysis.map(trait => (
                                                    <div key={trait.trait} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-slate-50">
                                                        <span className="font-medium">{trait.trait}</span>
                                                        <Badge className={alignmentColors[trait.alignment]}>{trait.alignment}</Badge>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircle/> Suggested Interview Questions</CardTitle></CardHeader>
                                            <CardContent>
                                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                                    {analysisResult.suggestedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
