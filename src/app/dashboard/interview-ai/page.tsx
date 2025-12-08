
'use client';
import React, { useState, useEffect, useRef } from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  BrainCircuit,
  Video,
  Mic,
  Send,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  AlertTriangle,
  Minimize,
  User,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { startInterview, submitAnswer, type InterviewState } from '@/ai/flows/interview-ai-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function InterviewAIPage() {
  const { toast } = useToast();
  const [jobRole, setJobRole] = useState('Frontend Developer');
  const [interviewState, setInterviewState] = useState<InterviewState | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const isInterviewActive = !!interviewState;

  useEffect(() => {
    let stream: MediaStream | null = null;
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup function to stop the camera stream when the component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if(videoRef.current && videoRef.current.srcObject){
         (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);


  const playAudio = (audioDataUri: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(audioDataUri);
    setCurrentAudio(audio);
    
    audio.onplay = () => setIsAiSpeaking(true);
    audio.onended = () => setIsAiSpeaking(false);
    audio.onerror = () => setIsAiSpeaking(false);

    audio.play().catch(() => setIsAiSpeaking(false));
  };
  
  useEffect(() => {
    return () => {
        currentAudio?.pause();
    }
  }, [currentAudio]);


  const handleStartInterview = async () => {
    setIsLoading(true);
    try {
      const initialState = await startInterview({ jobRole });
      setInterviewState(initialState);
      if (initialState.currentQuestion.audio) {
        playAudio(initialState.currentQuestion.audio);
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to start interview', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!interviewState || !userAnswer) return;
    setIsLoading(true);
    try {
      const newState = await submitAnswer({ interviewState, userAnswer });
      setInterviewState(newState);
      setUserAnswer('');
      if (newState.currentQuestion.audio) {
        playAudio(newState.currentQuestion.audio);
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Failed to submit answer', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const lastFeedback = interviewState?.history[interviewState.history.length - 1]?.feedback;

  const handleExitInterview = () => {
      setInterviewState(null);
      setUserAnswer('');
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      setIsAiSpeaking(false);
  };

  return (
    <div className={cn(
        "p-4 md:p-6 bg-slate-50/50 min-h-full",
        isInterviewActive && "fixed inset-0 bg-background z-50 p-0"
    )}>
        <Card className={cn(
            isInterviewActive && "h-full w-full border-0 rounded-none flex flex-col"
        )}>
            <CardHeader className={cn("flex-row items-center justify-between", isInterviewActive && 'pb-2')}>
                <div className="flex-1">
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <BrainCircuit className="text-primary" />
                    AI Interview Practice
                    </CardTitle>
                    <CardDescription>
                    Hone your interview skills with a virtual AI interviewer for the role of <span className="font-semibold text-primary">{jobRole}</span>.
                    </CardDescription>
                </div>
                 {isInterviewActive && (
                    <Button variant="outline" size="sm" onClick={handleExitInterview} className="gap-2">
                        <Minimize size={16} /> Exit Session
                    </Button>
                )}
            </CardHeader>
            <CardContent className={cn("flex-1", isInterviewActive && "p-2 sm:p-4 flex flex-col")}>
                 {!isInterviewActive && (
                    <div className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Start New Interview</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-full sm:w-auto flex-1 space-y-2">
                                    <Label htmlFor="job-role">Job Role</Label>
                                    <Input id="job-role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="e.g., Frontend Developer" />
                                </div>
                                <Button className="w-full sm:w-auto gap-2 self-end" onClick={handleStartInterview} disabled={isLoading || hasCameraPermission === false}>
                                    <Video size={16}/> {isLoading ? 'Starting...' : 'Start Practice Interview'}
                                </Button>
                            </CardContent>
                             {hasCameraPermission === false && (
                                <Alert variant="destructive" className="m-6 mt-0">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Camera Access Required</AlertTitle>
                                    <AlertDescription>
                                        Please enable camera permissions in your browser settings and refresh the page to use this feature.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </Card>
                    </div>
                )}
                {isInterviewActive && (
                     <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto">
                        <div className="space-y-4">
                             {/* AI Interviewer View */}
                             <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                                <div className={cn(
                                    "absolute inset-2 rounded-md border-2 border-transparent transition-all",
                                    isAiSpeaking && "border-primary shadow-lg shadow-primary/50 animate-pulse-glow"
                                )}></div>
                                <Image src={PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl || ''} alt="AI Interviewer" width={150} height={150} className="rounded-full grayscale" />
                            </div>

                             {/* User's Camera View */}
                            <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                            </div>
                        </div>

                        {/* Chat and Feedback */}
                         <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle>Interview Session</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between gap-4">
                                <div className="space-y-4 flex-1 overflow-y-auto p-4 bg-slate-50 rounded-lg min-h-[200px]">
                                    {/* AI Question */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                                            <BrainCircuit size={16}/>
                                        </div>
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <p className="font-semibold text-sm">{interviewState.currentQuestion.question}</p>
                                            <Button variant="ghost" size="icon" className="w-7 h-7 mt-2" onClick={() => playAudio(interviewState.currentQuestion.audio!)} disabled={!interviewState.currentQuestion.audio}>
                                                <Volume2 size={16}/>
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Last Feedback */}
                                    {lastFeedback && (
                                        <motion.div variants={itemVariants} className="space-y-3 pt-4 border-t">
                                            <div className="flex items-start gap-3 p-3 rounded-md bg-green-50 text-green-800">
                                                <ThumbsUp size={18} className="shrink-0 mt-0.5" />
                                                <p className="text-sm">{lastFeedback.positive}</p>
                                            </div>
                                            <div className="flex items-start gap-3 p-3 rounded-md bg-red-50 text-red-800">
                                                <ThumbsDown size={18} className="shrink-0 mt-0.5"/>
                                                <p className="text-sm">{lastFeedback.improvement}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                     <Textarea
                                        placeholder="Type your answer here..."
                                        rows={4}
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        disabled={!interviewState || isLoading}
                                    />
                                    <Button className="w-full gap-2" onClick={handleSubmitAnswer} disabled={!interviewState || isLoading || !userAnswer}>
                                        {isLoading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
                                        Submit Answer
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                     </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
