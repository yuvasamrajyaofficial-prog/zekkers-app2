
'use client';
import React, { useMemo, useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import ZLoader from '@/components/ui/loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';

type Quiz = {
    id: string;
    title: string;
    category: string;
    questions: any[];
    createdAt: any;
}

export default function AdminQuizzesPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const quizzesCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'quizzes');
  }, [firestore]);

  const { data: quizzes, isLoading, error } = useCollection<Quiz>(quizzesCollection);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  const getPostedDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
    return 'Invalid Date';
  };

  const handleDeleteQuiz = () => {
    if (!quizToDelete || !firestore) return;

    const quizRef = doc(firestore, 'quizzes', quizToDelete.id);
    deleteDocumentNonBlocking(quizRef);
    toast({
      title: 'Quiz Deletion Initiated',
      description: `The quiz "${quizToDelete.title}" is being deleted.`,
    });
    setQuizToDelete(null);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
            <div>
                <CardTitle>Quiz Management</CardTitle>
                <CardDescription>View, manage, and create quizzes for students.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin-dashboard/quizzes/create" className='gap-2'>
                    <PlusCircle size={16} />
                    Create New Quiz
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-10">
              <ZLoader />
            </div>
          )}
          {error && (
            <div className="text-center py-10 text-red-500">
              <p>Error loading quizzes: {error.message}</p>
            </div>
          )}
          {!isLoading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead># of Questions</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes && quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell><Badge variant="outline" className='capitalize'>{quiz.category}</Badge></TableCell>
                      <TableCell>{quiz.questions?.length || 0}</TableCell>
                      <TableCell>{getPostedDate(quiz.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Quiz</DropdownMenuItem>
                            <DropdownMenuItem>Edit Quiz</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => setQuizToDelete(quiz)}>Delete Quiz</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      No quizzes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!quizToDelete} onOpenChange={(open) => !open && setQuizToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quiz
              "{quizToDelete?.title}" and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteQuiz} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Yes, delete quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
