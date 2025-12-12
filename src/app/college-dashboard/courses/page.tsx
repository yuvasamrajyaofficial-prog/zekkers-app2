'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { type Course } from '@/services/courses';
import { useCourses } from '@/hooks/useCourses';
import { CourseCard } from './_components/course-card';
import { Button } from '@/components/ui/button';

export default function CoursesPage() {
  const { courses, setCourses, loading } = useCourses('demo-college');
  const [openCreate, setOpenCreate] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [editing, setEditing] = useState<Course | null>(null);

  // const create = async (payload: Partial<Course>) => {
  //   const created = await CoursesService.create('demo-college', payload);
  //   setCourses(prev => [created, ...prev]);
  // };
  // const save = async (course: Course) => {
  //   await CoursesService.update('demo-college', course.id, course);
  //   const updatedCourses = await CoursesService.list('demo-college');
  //   setCourses(updatedCourses);
  // };
  const onEdit = (c: Course) => setEditing(c);
  const onView = (c: Course) => setActiveCourse(c);

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Batches & Courses</h1>
          <p className="text-sm text-slate-500">Manage academic batches, training courses and exam batches.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setOpenCreate(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(c => (
                <CourseCard key={c.id} course={c} onView={onView} onEdit={onEdit} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals will be added in subsequent steps */}
      {/* <CreateCourseModal open={openCreate} onClose={() => setOpenCreate(false)} onCreate={create} /> */}
      {/* <CreateCourseModal open={!!editing} initial={editing || undefined} onClose={() => setEditing(null)} onCreate={async (p) => { if (editing) { await save({ ...editing, ...(p as any) }); setEditing(null); } else { await create(p); } }} /> */}
      {/* <CourseDetailsPanel course={activeCourse} onClose={() => setActiveCourse(null)} onSave={save} /> */}
    </div>
  );
};
