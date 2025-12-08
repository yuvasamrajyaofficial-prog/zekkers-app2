
'use client';

import { useEffect, useState } from 'react';
import { EmployersService, type Employer } from '@/services/employers';

export function useEmployers(collegeId?: string){
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ 
    let mounted = true; 
    (async ()=>{ 
      setLoading(true); 
      const e = await EmployersService.list(collegeId); 
      if(mounted){ 
        setEmployers(e); 
        setLoading(false); 
      } 
    })(); 
    return ()=> { mounted=false; }
  }, [collegeId]);
  
  return { employers, setEmployers, loading };
}
