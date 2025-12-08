import React from 'react';
import { fetchStudentAnalytics } from '@/services/insights';
import StudentAnalyticsClient from './_components/student-analytics-client';

// This is now a SERVER COMPONENT

interface PageProps {
  params: Promise<{ studentId: string }>;
}

export default async function StudentAnalyticsPage({ params }: PageProps) {
  const { studentId } = await params;

  // 1. Fetch data on the server
  const data = await fetchStudentAnalytics('demo-college', studentId);

  // 2. Pass data as props to the client component
  return <StudentAnalyticsClient initialData={data} studentId={studentId} />;
}
