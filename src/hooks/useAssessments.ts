
'use client';

import { useEffect, useState } from 'react';
import { Assessment, AssessmentService } from '@/services/assessments';

export function useAssessments(collegeId?: string){
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ 
    let mounted=true; 
    (async ()=>{ 
      setLoading(true); 
      const a = await AssessmentService.list(collegeId); 
      if(mounted){ 
        setAssessments(a); 
        setLoading(false); 
      } 
    })(); 
    return ()=>{ mounted=false; }; 
  }, [collegeId]);

  return { assessments, setAssessments, loading };
}

export function useAssessment(collegeId?:string, assessmentId?:string){
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ 
    let mounted=true; 
    (async ()=>{ 
      if(!assessmentId){ 
        setLoading(false); 
        return; 
      } 
      setLoading(true); 
      const a = await AssessmentService.get(collegeId, assessmentId); 
      if(mounted){ 
        setAssessment(a || null); 
        setLoading(false); 
      } 
    })(); 
    return ()=> { mounted=false; }
  }, [collegeId, assessmentId]);
  
  return { assessment, setAssessment, loading };
}
