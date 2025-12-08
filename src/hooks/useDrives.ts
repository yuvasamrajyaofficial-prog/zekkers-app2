
'use client';

import { useEffect, useState } from 'react';
import { DrivesService, type Drive } from '@/services/drives';

export function useDrives(collegeId?: string) {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchDrives = async () => {
      if (mounted) {
        setLoading(true);
        setError(null);
      }
      try {
        const d = await DrivesService.list(collegeId);
        if (mounted) {
          setDrives(d);
        }
      } catch (e: any) {
        if (mounted) {
          setError(e);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDrives();

    return () => {
      mounted = false;
    };
  }, [collegeId]);
  
  return { drives, setDrives, loading, error };
}
