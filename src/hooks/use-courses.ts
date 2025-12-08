'use client';

import { useEffect, useState } from 'react';
import { CoursesService, type Course } from '@/services/courses';

export function useCourses(collegeId?: string){
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
    let mounted = true;
    (async () => {
      setLoading(true); 
      const c = await CoursesService.list(collegeId); 
      if(mounted){ 
        setCourses(c); 
        setLoading(false);
      } 
    })(); 
    
    return () => { 
      mounted=false; 
    }; 
  }, [collegeId]);
  
  return { courses, setCourses, loading };
}
