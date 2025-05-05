
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';

export interface Job {
  id: string;
  name: string;
  progressPercent: number;
  startedAt: Date;
}

export function useInProgressJobs() {
  const { address, isConnected } = useAccount();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!isConnected || !address) {
      setJobs([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call - in a real app, this would fetch from your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - this would be the result from your API
      const mockJobs: Job[] = [
        {
          id: '1',
          name: 'AI Model Training',
          progressPercent: 45,
          startedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
          id: '2',
          name: 'Data Processing Task',
          progressPercent: 78,
          startedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        },
      ];
      
      setJobs(mockJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [isConnected, address]);

  const cancelJob = useCallback(async (jobId: string) => {
    if (!isConnected || !address) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call - in a real app, this would call your API or contract
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove the job from the list
      setJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error cancelling job:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isConnected, address]);

  const completeJob = useCallback((job: Job) => {
    // Remove the job from the list when it's complete
    setJobs(prev => prev.filter(j => j.id !== job.id));
    // In a real app, you might want to update some stats or show a notification
  }, []);

  // Poll for job updates every 10 seconds
  useEffect(() => {
    if (!isConnected) return;
    
    fetchJobs();
    
    const interval = setInterval(() => {
      // Update progress of jobs randomly for demonstration
      setJobs(prev => 
        prev.map(job => ({
          ...job,
          progressPercent: Math.min(100, job.progressPercent + Math.random() * 10)
        }))
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isConnected, fetchJobs]);

  return { 
    jobs, 
    loading, 
    error, 
    cancelJob,
    completeJob,
    refreshJobs: fetchJobs 
  };
}
