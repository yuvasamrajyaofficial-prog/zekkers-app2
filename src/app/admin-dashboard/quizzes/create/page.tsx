
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ChevronLeft, PlusCircle, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

type Question = {
    text: string;
    options: string[];
    correctAnswer: number;
}

export default function AdminCreateQuizPage() {
    const { toast } = useToast();
    const router = useRouter();
    const firestore = useFirestore();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([
        { text: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index: number, field: 'text' | 'options', value: any) => {
        const newQuestions = [...questions];
        if (field === 'text') {
            newQuestions[index].text = value;
        } else if (field === 'options') {
            newQuestions[index].options = value;
        }
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const setCorrectAnswer = (qIndex: number, oIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = oIndex;
        setQuestions(newQuestions);
    }

    const handleSubmit = () => {
        if (!title || !category) {
            toast({ variant: 'destructive', title: 'Please fill out title and category.'});
            return;
        }
        if (!firestore) {
            toast({ variant: 'destructive', title: 'Firestore not available.'});
            return;
        }

        setIsLoading(true);
        addDocumentNonBlocking(collection(firestore, 'quizzes'), {
            title,
            category,
            questions,
            createdAt: serverTimestamp(),
        });
        toast({ title: "Quiz saved successfully!" });
        router.push('/admin-dashboard/quizzes');
    };

    return (
        <div className="p-6">
            <div className="mb-4">
                 <Button variant="ghost" onClick={() => router.back()} className='gap-2'>
                    <ChevronLeft size={16}/>
                    Back
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Quiz</CardTitle>
                    <CardDescription>Fill out the details to create a new quiz for students.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Quiz Title</Label>
                            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Weekly Current Affairs" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g., General Knowledge" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Questions</h3>
                        {questions.map((q, qIndex) => (
                            <Card key={qIndex} className="p-4 bg-slate-50">
                                <CardContent className="p-0">
                                <div className="flex items-start justify-between">
                                    <Label>Question {qIndex + 1}</Label>
                                    {questions.length > 1 && <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeQuestion(qIndex)}><Trash2 size={16} /></Button>}
                                </div>
                                <Textarea 
                                    placeholder="Enter the question text..."
                                    value={q.text}
                                    onChange={e => handleQuestionChange(qIndex, 'text', e.target.value)}
                                    className="mt-2"
                                />
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {q.options.map((opt, oIndex) => (
                                        <div key={oIndex} className="flex items-center gap-2">
                                            <Input value={opt} onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)} placeholder={`Option ${oIndex + 1}`} />
                                            <Button 
                                                variant={q.correctAnswer === oIndex ? 'secondary' : 'outline'} 
                                                size="sm"
                                                onClick={() => setCorrectAnswer(qIndex, oIndex)}
                                                className={q.correctAnswer === oIndex ? 'bg-green-200 text-green-800' : ''}
                                            >
                                                Correct
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outline" onClick={addQuestion} className="gap-2">
                            <PlusCircle size={16} />
                            Add Another Question
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Quiz'}
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
