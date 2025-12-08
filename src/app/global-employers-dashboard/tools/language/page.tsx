
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
import {
  Languages,
  UploadCloud,
  Sparkles,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MOCK_GLOBAL_CANDIDATES } from '@/types/global-candidate';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

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

// --- Mock Data ---
interface AnalysisResult {
    score: number;
    cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    summary: string;
    metrics: {
        pronunciation: number;
        fluency: number;
        grammar: number;
        vocabulary: number;
    };
    feedback: {
        strength: string;
        improvement: string;
    };
    learningPath: string[];
}

const mockAnalysis = (lang: string): AnalysisResult => {
    const score = 60 + Math.floor(Math.random() * 35);
    return {
        score,
        cefrLevel: score > 90 ? 'C1' : score > 75 ? 'B2' : 'B1',
        summary: `The candidate demonstrates a B2 (Upper-Intermediate) level of ${lang}. They can communicate effectively on a range of topics, though some complex grammatical structures and idioms are still developing.`,
        metrics: {
            pronunciation: 85,
            fluency: 78,
            grammar: 72,
            vocabulary: 81,
        },
        feedback: {
            strength: "Clear articulation and a wide range of vocabulary for common business topics.",
            improvement: "Occasional errors in complex sentence structures and use of idiomatic expressions."
        },
        learningPath: [
            "Practice advanced conditional sentences.",
            "Expand vocabulary with industry-specific jargon.",
            "Engage in mock interviews to improve fluency under pressure.",
        ]
    };
};

const SkillMeter = ({ label, value }: { label: string; value: number }) => (
    <div>
        <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-medium text-muted-foreground">{label}</span>
            <span className="font-bold text-primary">{value}%</span>
        </div>
        <Progress value={value} />
    </div>
);


// --- Main Component ---
export default function LanguageProficiencyEvaluator() {
    const [selectedCandidate, setSelectedCandidate] = useState<string | undefined>(MOCK_GLOBAL_CANDIDATES[0].id);
    const [language, setLanguage] = useState('English');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const { toast } = useToast();

    const handleAnalyze = () => {
        if (!selectedCandidate || !file) {
            toast({ title: "Please select a candidate and upload a file.", variant: "destructive" });
            return;
        }
        setLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult(mockAnalysis(language));
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3"><Languages className="text-primary"/>AI Language Proficiency Evaluator</CardTitle>
                    <CardDescription>Assess a candidate's language skills from an audio or video recording.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="p-6 border rounded-lg bg-slate-50/50 space-y-6">
                            <div>
                                <Label className="font-semibold">1. Select Candidate & Language</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                     <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                                        <SelectTrigger><SelectValue placeholder="Select candidate..."/></SelectTrigger>
                                        <SelectContent>
                                            {MOCK_GLOBAL_CANDIDATES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                     <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger><SelectValue placeholder="Select language..."/></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="German">German</SelectItem>
                                            <SelectItem value="French">French</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label className="font-semibold">2. Upload Audio/Video File</Label>
                                <div className="mt-2">
                                    <Input type="file" accept="audio/*,video/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                                    <p className="text-xs text-muted-foreground mt-1">Upload a short recording of the candidate speaking (e.g., from an interview).</p>
                                </div>
                            </div>
                            <Button size="lg" className="w-full gap-2" onClick={handleAnalyze} disabled={loading}>
                                <Sparkles size={18}/>
                                {loading ? 'Analyzing...' : 'Start AI Evaluation'}
                            </Button>
                        </div>
                        
                        {/* Results Section */}
                         <div className="p-4">
                            {!result && !loading && (
                                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground bg-slate-50 rounded-lg border-2 border-dashed">
                                    <Languages size={48} className="opacity-30"/>
                                    <p className="mt-4 font-semibold">Evaluation results will appear here.</p>
                                </div>
                            )}
                            {loading && (
                                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                                    <Sparkles size={48} className="animate-pulse text-primary"/>
                                    <p className="mt-4 font-semibold">AI is analyzing the recording...</p>
                                </div>
                            )}
                            {result && (
                                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Overall Assessment</CardTitle>
                                            <CardDescription>CEFR Level: <span className="font-bold text-primary">{result.cefrLevel}</span></CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">{result.summary}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>Skill Breakdown</CardTitle></CardHeader>
                                        <CardContent className="space-y-4">
                                            <SkillMeter label="Pronunciation" value={result.metrics.pronunciation} />
                                            <SkillMeter label="Fluency" value={result.metrics.fluency} />
                                            <SkillMeter label="Grammar" value={result.metrics.grammar} />
                                            <SkillMeter label="Vocabulary" value={result.metrics.vocabulary} />
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader><CardTitle>Recommended Learning Path</CardTitle></CardHeader>
                                        <CardContent>
                                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                                {result.learningPath.map((step, i) => <li key={i}>{step}</li>)}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
