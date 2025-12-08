
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_EXAMS, Exam, Question, Section } from '@/lib/exams';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Save,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

type Answers = { [key: string]: number };

export default function QuizTakingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const quizId = params.quizId as string;

  const [exam, setExam] = useState<Exam | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const foundExam = MOCK_EXAMS.find((e) => e.id === quizId);
    if (foundExam) {
      setExam(foundExam);
      const questions = foundExam.sections.flatMap(s => s.questions);
      setAllQuestions(questions);
      
      // Load saved answers
      const savedAnswers = localStorage.getItem(`quiz-${quizId}`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    }
  }, [quizId]);

  const currentQuestion = useMemo(() => allQuestions[currentQuestionIndex], [allQuestions, currentQuestionIndex]);

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    const newAnswers = { ...answers, [questionId]: answerIndex };
    setAnswers(newAnswers);
    localStorage.setItem(`quiz-${quizId}`, JSON.stringify(newAnswers));
  };
  
  const handleSaveAndExit = () => {
    toast({ title: 'Progress Saved', description: 'You can resume this quiz later.'});
    router.push('/dashboard/quiz');
  }

  const handleSubmit = () => {
    let newScore = 0;
    allQuestions.forEach(q => {
      if (q.id && answers[q.id] === q.answerIndex) {
        newScore += (q.points || 1);
      }
    });
    setScore(newScore);
    setIsFinished(true);
    localStorage.removeItem(`quiz-${quizId}`);
  };

  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  if (!exam) {
    return <div>Loading...</div>;
  }
  
  if (isFinished) {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Quiz Finished!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-lg">Your Score:</p>
                    <p className="text-5xl font-bold my-4">{score} / {allQuestions.reduce((sum, q) => sum + (q.points || 1), 0)}</p>
                    <Button onClick={() => router.push('/dashboard/quiz')}>Back to Quizzes</Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
       <Button variant="ghost" size="sm" className="mb-4 gap-2" onClick={() => router.push('/dashboard/quiz')}>
          <ChevronLeft size={16}/> Back to Quizzes
       </Button>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{exam.title}</h1>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleSaveAndExit}><Save size={14}/> Save & Exit</Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <Clock size={16} /> {exam.durationMins} minutes
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent>
          {currentQuestion && (
            <div>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {allQuestions.length}
              </p>
              <h2 className="text-xl font-semibold my-4">
                {currentQuestion.text}
              </h2>
              <RadioGroup
                value={answers[currentQuestion.id]?.toString()}
                onValueChange={(val) => handleAnswerChange(currentQuestion.id, parseInt(val))}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => (
                  <Label
                    key={index}
                    htmlFor={`${currentQuestion.id}-${index}`}
                    className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`${currentQuestion.id}-${index}`}
                    />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentQuestionIndex < allQuestions.length - 1 ? (
              <Button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(allQuestions.length - 1, prev + 1)
                  )
                }
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Submit Quiz</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will submit your answers. You cannot make any more changes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
