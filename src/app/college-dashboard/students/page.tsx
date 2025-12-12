
'use client';
import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection } from 'firebase/firestore';
import { ProfileData } from '@/services/profile';
import ZLoader from '@/components/ui/loader';
import { Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { StudentCard } from './_components/student-card';
import { StudentFiltersBar } from './_components/student-filters-bar';
import { StudentAnalyticsPanel } from './_components/student-analytics-panel';
import type { User } from 'firebase/auth';


interface StudentsPageProps {}

export default function StudentsPage({}: StudentsPageProps) {
  const { user, isLoading: userLoading } = useUser();
  const firestore = useFirestore();
  const isPreview = !user || user.isAnonymous;

  const mockStudents: ProfileData[] = [
    {
        id: '1',
        name: 'Anjali Sharma',
        email: 'anjali.sharma@example.com',
        role: 'Student/Job Seeker',
        avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl,
        resumeScore: 88,
        experience: [],
        education: [],
        skills: [{name: 'React', level: 90}, {name: 'Node.js', level: 75}, {name: 'SQL', level: 80}],
        social: {},
        languages: [],
        certifications: [],
        projects: [],
        department: 'Computer Science',
        batch: '2024',
        profileCompletion: 95,
        placementStatus: 'Placed',
        verified: true,
    },
    {
        id: '2',
        name: 'Rohan Verma',
        email: 'rohan.verma@example.com',
        role: 'Student/Job Seeker',
        avatarUrl: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl,
        resumeScore: 92,
        experience: [],
        education: [],
        skills: [{name: 'Python', level: 95}, {name: 'ML', level: 85}, {name: 'TensorFlow', level: 80}],
        social: {},
        languages: [],
        certifications: [],
        projects: [],
        department: 'Computer Science',
        batch: '2024',
        profileCompletion: 80,
        placementStatus: 'In Process',
        verified: true,
    },
    {
        id: '3',
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        role: 'Student/Job Seeker',
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
        resumeScore: 75,
        experience: [],
        education: [],
        skills: [{name: 'Java', level: 88}, {name: 'Spring', level: 82}, {name: 'DevOps', level: 70}],
        social: {},
        languages: [],
        certifications: [],
        projects: [],
        department: 'Information Technology',
        batch: '2025',
        profileCompletion: 65,
        placementStatus: 'Not Placed',
        verified: false,
    },
    {
        id: '4',
        name: 'Amit Patel',
        email: 'amit.patel@example.com',
        role: 'Student/Job Seeker',
        avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
        resumeScore: 68,
        experience: [],
        education: [],
        skills: [{name: 'C++', level: 90}, {name: 'Gaming', level: 75}, {name: 'Unity', level: 78}],
        social: {},
        languages: [],
        certifications: [],
        projects: [],
        department: 'Mechanical Engineering',
        batch: '2024',
        profileCompletion: 40,
        placementStatus: 'Not Placed',
        verified: false,
    },
    {
        id: '5',
        name: 'Sunita Williams',
        email: 'sunita.williams@example.com',
        role: 'Student/Job Seeker',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
        resumeScore: 95,
        experience: [],
        education: [],
        skills: [{ name: 'Aerospace Engineering', level: 95 }, { name: 'Robotics', level: 85 }],
        social: {},
        languages: [],
        certifications: [],
        projects: [],
        department: 'Aerospace Engineering',
        batch: '2024',
        profileCompletion: 100,
        placementStatus: 'Placed',
        verified: true,
    },
    {
        id: '6',
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        role: 'Student/Job Seeker',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&q=80',
        resumeScore: 81,
        experience: [],
        education: [],
        skills: [{ name: 'Civil Engineering', level: 88 }, { name: 'AutoCAD', level: 92 }],
        social: {},
        languages: [],
        certifications: [],
        projects: [],
        department: 'Civil Engineering',
        batch: '2025',
        profileCompletion: 75,
        placementStatus: 'Interned',
        verified: true,
    }
];

  const usersCollection = useMemo(() => {
    // Only fetch if firestore is available and user is not in preview mode
    if (!firestore || isPreview) return null;
    return collection(firestore, 'users');
  }, [firestore, isPreview]);

  const { data: users, isLoading: liveDataLoading, error } = useCollection<ProfileData>(usersCollection);
  
  const liveStudents = useMemo(() => {
    return users?.filter(user => user.role === 'Student/Job Seeker') || [];
  }, [users]);
  
  const isLoading = userLoading || (!isPreview && liveDataLoading);

  // Use mock data in preview mode, otherwise use live data
  const students = isPreview ? mockStudents : liveStudents;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Users className="text-primary" />
          Student Directory
        </h1>
        <p className="text-slate-500 mt-1">
          Manage and track all students in your institution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <main className="lg:col-span-3 space-y-4">
            <StudentFiltersBar />
            {isLoading && (
              <div className="flex justify-center py-10">
                <ZLoader />
              </div>
            )}
            {error && (
              <div className="text-center py-10 text-red-500">
                <p>Error loading students: {error.message}</p>
              </div>
            )}
            {!isLoading && !error && (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {students.length > 0 ? (
                      students.map(student => (
                          <StudentCard key={student.id} student={student} />
                      ))
                  ) : (
                      <div className="col-span-full text-center h-48 flex items-center justify-center bg-white border rounded-lg">
                          <p>No students found.</p>
                      </div>
                  )}
               </div>
            )}
        </main>
        <StudentAnalyticsPanel students={students} />
      </div>
    </div>
  );
}
