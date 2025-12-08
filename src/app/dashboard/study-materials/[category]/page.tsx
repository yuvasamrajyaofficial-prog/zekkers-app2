
'use client';
import React from 'react';
import { studyCategories } from '@/lib/study-materials';
import StudyCategoryClient from '@/app/dashboard/study-materials/[category]/_components/study-category-client';
import { useParams } from 'next/navigation';

export default function StudyCategoryPage() {
  const params = useParams();
  const { category: categorySlug } = params;

  const category = studyCategories.find((cat) => cat.slug === categorySlug);

  return <StudyCategoryClient category={category} />;
}
