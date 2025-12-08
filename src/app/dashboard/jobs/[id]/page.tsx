
import { fetchJobById } from '@/services/jobs';
import JobsDetailClient from './_components/job-detail-client';
import { Job } from '@/types/job';
import React from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// This is now a Server Component that fetches data on the server.
export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Fetch data on the server
  const job = await fetchJobById(id);

  // Pass raw job data as props to the client component
  return <JobsDetailClient job={job} />;
}
