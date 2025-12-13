
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
import { Textarea } from '@/components/ui/textarea';
import {
  FileUp,
  Sparkles,
  Clipboard,
  Lightbulb,
  CheckCircle,
  XCircle,
  Loader2,
  Download,
  BookUser,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCoverLetter } from '@/ai/flows/ai-cover-letter-generator';
import { analyzeResumeAgainstJob, type ResumeAnalysis } from '@/ai/flows/resume-analyzer';
import { parseResume } from '@/ai/flows/resume-parser';
import { Badge } from '@/components/ui/badge';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ProfileData } from '@/services/profile';
import ZLoader from '@/components/ui/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';


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

// --- Helper Functions ---
const formatProfileToText = (profile: ProfileData | null): string => {
  if (!profile) return "Your profile data is not available. Please complete your profile first.";
  let resume = `${profile.name}\n${profile.email} | ${profile.phone || ''} | ${profile.location || ''}\n\n`;
  resume += `**About**\n${profile.about || 'Not provided.'}\n\n`;
  
  if (profile.experience?.length > 0) {
    resume += '**Work Experience**\n';
    profile.experience.forEach(exp => {
      resume += `- ${exp.role} at ${exp.company} (${exp.from} - ${exp.to})\n  - ${exp.description}\n`;
    });
    resume += '\n';
  }

  if (profile.education?.length > 0) {
    resume += '**Education**\n';
    profile.education.forEach(edu => {
      resume += `- ${edu.degree}, ${edu.school} (${edu.startYear} - ${edu.endYear})\n`;
    });
    resume += '\n';
  }

  if (profile.skills?.length > 0) {
    resume += '**Skills**\n';
    resume += profile.skills.map(skill => skill.name).join(', ') + '\n';
  }

  return resume;
}

const ResumeTemplatePreview = ({ title, className }: { title: string, className?: string }) => (
  <div className={cn('p-4 border-2 rounded-lg cursor-pointer hover:border-primary', className)}>
    <div className="font-bold">{title}</div>
    <div className="mt-2 space-y-1">
      <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
      <div className="h-1 w-full bg-slate-200 rounded"></div>
      <div className="h-1 w-2/3 bg-slate-200 rounded"></div>
    </div>
  </div>
);


export default function ResumeAIPage() {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isLoadingCoverLetter, setIsLoadingCoverLetter] = useState(false);
  const [isParsingResume, setIsParsingResume] = useState(false);

  const { user, isLoading: isUserLoading } = useUser();
  const firestore = useFirestore();
  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<ProfileData>(userProfileRef);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both your resume and a job description.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoadingAnalysis(true);
    setAnalysis(null);
    setCoverLetter(null);
    try {
      const result = await analyzeResumeAgainstJob({
        resume: resumeText,
        jobDescription: jobDescription,
      });
      setAnalysis(result);
      toast({ title: 'Analysis Complete!' });
    } catch (error: any) {
      toast({
        title: 'Analysis Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoadingAnalysis(false);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsParsingResume(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        try {
            const parsed = await parseResume({ resumeDataUri: dataUri });
            const extractedText = `Name: ${parsed.name}\nEmail: ${parsed.email}\nPhone: ${parsed.phone}\n\nEducation:\n${parsed.education.join('\n')}\n\nExperience:\n${parsed.experience.join('\n')}\n\nSkills:\n${parsed.skills.join(', ')}`;
            setResumeText(extractedText);
            toast({ title: "Resume Parsed Successfully" });
        } catch (error: any) {
            toast({ variant: 'destructive', title: "Resume Parsing Failed", description: error.message });
        } finally {
            setIsParsingResume(false);
        }
      };
      reader.onerror = () => {
        toast({ variant: 'destructive', title: "Failed to read file."});
        setIsParsingResume(false);
      }
      reader.readAsDataURL(file);
    }
  };


  const handleGenerateCoverLetter = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: 'Missing Information',
        description: 'Please provide resume and job description first.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoadingCoverLetter(true);
    try {
      const result = await generateCoverLetter({
        resume: resumeText,
        jobDescription: jobDescription,
      });
      setCoverLetter(result.coverLetter);
      toast({ title: 'Cover Letter Generated!' });
    } catch (error: any) {
      toast({
        title: 'Cover Letter Generation Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoadingCoverLetter(false);
    }
  };

  const handleBuildFromProfile = () => {
    const text = formatProfileToText(userProfile);
    setResumeText(text);
    toast({ title: 'Resume Built From Profile' });
  };
  
  const handleDownloadPdf = () => {
    // This is a simplified implementation using browser's print functionality
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Resume</title>');
      printWindow.document.write('<style>body { font-family: sans-serif; white-space: pre-wrap; word-wrap: break-word; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(`<pre>${resumeText}</pre>`);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      toast({ variant: 'destructive', title: 'Could not open print window' });
    }
  };

  const copyToClipboard = (text: string | null) => {
    if (text) {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard!" });
    }
  }
  
  if (isUserLoading || isProfileLoading) {
    return <div className="flex h-full items-center justify-center"><ZLoader /></div>
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <FileUp className="text-primary" />
              Resume AI Studio
            </CardTitle>
            <CardDescription>
              Build, analyze, and optimize your resume for any job description.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs defaultValue="analyzer" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1">
                    <TabsTrigger value="analyzer" className="py-2">AI Analyzer</TabsTrigger>
                    <TabsTrigger value="builder" className="py-2">Resume Builder</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analyzer" className="mt-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                    {/* Inputs Column */}
                    <div className="space-y-6">
                        <Card>
                        <CardHeader>
                            <CardTitle>Your Resume</CardTitle>
                            <CardDescription>Paste your resume text or upload a file.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-2">
                                <label htmlFor="resume-upload" className="w-full text-sm font-medium p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50">
                                    <FileUp className="w-8 h-8 text-slate-400 mb-2"/>
                                    <span className="text-primary">Click to upload a file</span>
                                    <span className="text-xs text-muted-foreground">PDF, DOCX, or Image</span>
                                </label>
                                <Input id="resume-upload" type="file" className="sr-only" onChange={handleFileChange} disabled={isParsingResume} />
                           </div>
                           <div className="my-4 text-center text-xs text-muted-foreground">OR</div>
                            <Textarea
                            placeholder="Paste your full resume text here..."
                            className="h-64"
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            disabled={isParsingResume}
                            />
                             {isParsingResume && <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Parsing your resume...</div>}
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader>
                            <CardTitle>Target Job Description</CardTitle>
                            <CardDescription>Paste the job description you are applying for.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                            placeholder="Paste the target job description here..."
                            className="h-64"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </CardContent>
                        </Card>
                        <Button size="lg" className="w-full gap-2" onClick={handleAnalyze} disabled={isLoadingAnalysis}>
                            <Sparkles size={18} />
                            {isLoadingAnalysis ? "Analyzing..." : "Run AI Analysis"}
                        </Button>
                    </div>

                    {/* Results Column */}
                    <div className="space-y-6">
                        {!analysis && !isLoadingAnalysis && (
                            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground bg-slate-50 rounded-lg border-2 border-dashed p-8">
                                <Sparkles size={48} className="opacity-30"/>
                                <p className="mt-4 font-semibold">Your AI analysis will appear here.</p>
                            </div>
                        )}
                        {isLoadingAnalysis && (
                            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground bg-slate-50 rounded-lg p-8">
                                <Loader2 size={48} className="animate-spin text-primary"/>
                                <p className="mt-4 font-semibold">AI is analyzing your resume...</p>
                            </div>
                        )}
                        {analysis && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <Card>
                            <CardHeader>
                                <CardTitle>AI Analysis & Score</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className={`text-6xl font-bold ${analysis.matchScore > 80 ? 'text-green-600' : 'text-amber-500'}`}>
                                {analysis.matchScore}%
                                </div>
                                <p className="font-semibold text-muted-foreground">Resume Match Score</p>
                                <p className="text-sm mt-4">{analysis.summary}</p>
                            </CardContent>
                            </Card>
                            
                            <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-600"><CheckCircle size={20}/> Strengths</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                    {analysis.strengths.map((s,i) => <li key={i}>{s}</li>)}
                                </ul>
                            </CardContent>
                            </Card>
                            
                            <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-500"><XCircle size={20}/> Areas for Improvement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                    {analysis.improvements.map((s,i) => <li key={i}>{s}</li>)}
                                </ul>
                            </CardContent>
                            </Card>

                            <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary"><Lightbulb size={20}/> AI Cover Letter</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoadingCoverLetter ? (
                                    <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="animate-spin"/> Generating...</div>
                                ) : coverLetter ? (
                                    <div className="relative">
                                        <Textarea readOnly value={coverLetter} className="h-48 bg-slate-50" />
                                        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(coverLetter)}>
                                            <Clipboard size={16}/>
                                        </Button>
                                    </div>
                                ) : (
                                    <Button className="w-full" onClick={handleGenerateCoverLetter}>Generate Cover Letter</Button>
                                )}
                            </CardContent>
                            </Card>
                        </motion.div>
                        )}
                    </div>
                    </motion.div>
                </TabsContent>
                 <TabsContent value="builder" className="mt-6">
                    <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Resume Content</CardTitle>
                                    <CardDescription>Enter your resume details or build from your profile.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={handleBuildFromProfile} className="w-full gap-2 mb-4">
                                        <BookUser size={16} /> Build from My Profile
                                    </Button>
                                    <Textarea 
                                        className="h-96"
                                        value={resumeText}
                                        onChange={(e) => setResumeText(e.target.value)}
                                        placeholder="Start typing or build from your profile..."
                                    />
                                </CardContent>
                            </Card>
                             <Button size="lg" onClick={handleDownloadPdf} className="w-full gap-2">
                                <Download size={18} /> Download as PDF
                            </Button>
                        </div>
                        <div>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Choose a Template</CardTitle>
                                    <CardDescription>Select a style for your resume PDF.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                   <ResumeTemplatePreview title="Modern" className="border-primary" />
                                   <ResumeTemplatePreview title="Classic" />
                                   <ResumeTemplatePreview title="Creative" />
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                 </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    </div>
  );
}

