
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
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Clock,
  Globe,
  Award,
  Target,
  Rocket,
  Code,
  Laptop,
  Search,
  Users,
  Building,
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import SkillBar from '@/components/skill-bar';
import { generateRoadmap } from '@/ai/flows/ai-roadmap-generator';

const iconMap: any = {
  GraduationCap,
  BrainCircuit,
  Briefcase,
  Globe,
  Rocket,
  Code,
  Laptop,
  Search,
  Users,
  Building,
  Award,
  BookOpen,
  Lightbulb,
  Target
};


const MotionCard = motion(Card);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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


const mockRoadmap = {
  goal: 'Become a Software Engineer in Germany',
  phases: [
    {
      title: 'Phase 1: Foundation (0-3 Months)',
      icon: <GraduationCap />,
      tasks: [
        { text: 'Master Data Structures & Algorithms', completed: true },
        { text: 'Complete a course on Advanced JavaScript (ES6+)', completed: true },
        { text: 'Build 2 simple projects with HTML/CSS/JS', completed: false },
      ],
      cost: 2000,
      duration: '3 months',
    },
    {
      title: 'Phase 2: Upskilling (3-6 Months)',
      icon: <BrainCircuit />,
      tasks: [
        { text: 'Learn React.js & State Management (Redux/Zustand)', completed: false },
        { text: 'Learn Node.js, Express, and REST API principles', completed: false },
        { text: 'Build a full-stack MERN application', completed: false },
      ],
      cost: 5000,
      duration: '3 months',
    },
     {
      title: 'Phase 3: Job Readiness (6-9 Months)',
      icon: <Briefcase />,
      tasks: [
        { text: 'Optimize resume with AI keywords', completed: false },
        { text: 'Prepare for technical interviews (LeetCode Easy/Medium)', completed: false },
        { text: 'Build and deploy a portfolio website', completed: false },
      ],
      cost: 1000,
      duration: '3 months',
    },
    {
        title: 'Phase 4: International Pathway (9-12 Months)',
        icon: <Globe />,
        tasks: [
            { text: 'Research German Job Seeker Visa requirements', completed: false },
            { text: 'Network with developers in Berlin on LinkedIn', completed: false },
            { text: 'Start applying for jobs in Germany', completed: false },
        ],
        cost: 150000,
        duration: '3 months',
    }
  ],
};


export default function AiRoadmapPage() {
  const [goal, setGoal] = useState('');
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const handleGenerateRoadmap = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const result = await generateRoadmap({ goal });
      
      // Map string icons to React components
      const processedRoadmap = {
        ...result,
        phases: result.phases.map((phase: any) => ({
          ...phase,
          icon: phase.icon && iconMap[phase.icon] ? React.createElement(iconMap[phase.icon]) : <BrainCircuit />
        }))
      };

      setRoadmap(processedRoadmap);
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
      // Fallback to mock if AI fails
      setRoadmap(mockRoadmap);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-full bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
            <motion.div initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5}}>
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">AI Career Roadmap</h1>
                <p className="mt-2 text-lg text-slate-500">
                    Your personalized path to success, powered by AI.
                </p>
            </motion.div>
        
            <motion.div 
                initial={{scale: 0.9, opacity: 0}} 
                animate={{scale: 1, opacity: 1}} 
                transition={{duration: 0.5, delay: 0.2}}
                className="mt-6 max-w-2xl mx-auto"
            >
            <Card className="shadow-lg">
                <CardContent className="p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full">
                        <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                        type="text"
                        placeholder="e.g., Become a Machine Learning Engineer in Canada"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="pl-10 h-12 text-base"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateRoadmap()}
                        />
                    </div>
                    <Button onClick={handleGenerateRoadmap} size="lg" className="w-full sm:w-auto" disabled={loading}>
                        {loading ? 'Generating...' : 'Create My Path'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
            </motion.div>
        </header>

        {!roadmap && !loading && (
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed">
                <BrainCircuit className="w-16 h-16 text-primary mx-auto opacity-50" />
                <h3 className="mt-4 text-xl font-semibold">Tell us your dream. We'll show you the path.</h3>
                <p className="mt-2 max-w-prose mx-auto text-slate-500">Enter your career goal above to generate a step-by-step roadmap. Our AI will analyze your profile to create a personalized plan, including skills to learn, projects to build, and jobs to target.</p>
             </motion.div>
        )}
        
        {loading && (
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-16 px-6">
                <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}>
                    <BrainCircuit className="w-16 h-16 text-primary mx-auto" />
                </motion.div>
                <h3 className="mt-4 text-xl font-semibold animate-pulse">AI is crafting your future...</h3>
                <p className="mt-2 text-slate-500">Analyzing your profile and generating your personalized career path.</p>
             </motion.div>
        )}

        {roadmap && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* User Context */}
            <h2 className="text-2xl font-bold mb-4">Your Current Status</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                 <MotionCard variants={itemVariants}>
                     <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                        <GraduationCap className="w-8 h-8 text-primary"/>
                        <CardTitle>Education</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <p className="font-semibold">B.Tech in Computer Science</p>
                         <p className="text-sm text-slate-500">ABC University (2020-2024)</p>
                     </CardContent>
                 </MotionCard>
                  <MotionCard variants={itemVariants}>
                     <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                        <Briefcase className="w-8 h-8 text-accent"/>
                        <CardTitle>Experience</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <p className="font-semibold">6-Month Internship</p>
                         <p className="text-sm text-slate-500">Web Developer at ZekkTech</p>
                     </CardContent>
                 </MotionCard>
                  <MotionCard variants={itemVariants}>
                     <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                        <Lightbulb className="w-8 h-8 text-yellow-500"/>
                        <CardTitle>Top Skills</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                        <SkillBar label="JavaScript" value={70} />
                        <SkillBar label="HTML/CSS" value={85} />
                     </CardContent>
                 </MotionCard>
             </div>

            {/* Roadmap Timeline */}
            <h2 className="text-2xl font-bold mb-6">Your 12-Month Transformation Journey</h2>
            <div className="relative">
                 {/* The timeline */}
                 <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 rounded-full -translate-x-1/2"></div>
                {roadmap.phases.map((phase: any, index: number) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative mb-8 flex md:justify-between md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                         <div className="hidden md:block w-5/12"></div>

                        <div className="z-10 absolute left-6 top-2 md:static flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-200 -translate-x-1/2">
                           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">{phase.icon}</div>
                        </div>
                        
                        <div className="w-full md:w-5/12 pl-16 md:pl-0">
                            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg">{phase.title}</CardTitle>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                                        <div className="flex items-center gap-1.5"><Clock size={14}/> {phase.duration}</div>
                                        <div className="flex items-center gap-1.5"><DollarSign size={14}/> Est. ₹{phase.cost.toLocaleString()}</div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                    {phase.tasks.map((task: any, i: number) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                            <CheckCircle2 className={`w-5 h-5 mt-px shrink-0 ${task.completed ? 'text-green-500' : 'text-slate-300'}`} />
                                            <span>{task.text}</span>
                                        </li>
                                    ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                    </motion.div>
                ))}
            </div>

            </motion.div>
        )}
      </div>
    </div>
  );
}
