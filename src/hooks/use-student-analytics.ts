'use client';
import { useMemo } from 'react';
import { ProfileData } from '@/services/profile';

export function useStudentAnalytics(students: ProfileData[]){
  return useMemo(()=>{
    if (!students || students.length === 0) {
        return { total: 0, byDept: {}, avgResume: 0, readyCount: 0, placements: 0 };
    }
    const total = students.length;
    const byDept = students.reduce((acc:any, s)=>{ acc[s.department || 'Unknown'] = (acc[s.department||'Unknown']||0)+1; return acc; }, {});
    const avgResume = students.reduce((a,b)=> a + (b.resumeScore||0),0)/Math.max(1, total);
    const readyCount = students.filter(s=> (s.profileCompletion||0) >= 80 && (s.resumeScore||0) >= 70).length;
    const placements = students.filter(s=> s.placementStatus==='Placed').length;
    return { total, byDept, avgResume: Math.round(avgResume), readyCount, placements };
  }, [students]);
}
