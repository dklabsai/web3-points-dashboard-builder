
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: string;
  name: string;
  progressPercent: number;
  startedAt: Date;
}

interface JobsInProgressProps {
  jobs: Job[];
  onCancelJob: (jobId: string) => Promise<void>;
  onJobComplete: (job: Job) => void;
}

const JobCard = ({ job, onCancel }: { job: Job, onCancel: (jobId: string) => Promise<void> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const startedTimeAgo = formatDistanceToNow(new Date(job.startedAt), { addSuffix: true });

  const handleCancel = async () => {
    if (window.confirm(`Are you sure you want to cancel "${job.name}"?`)) {
      setIsLoading(true);
      try {
        await onCancel(job.id);
        toast({
          title: "Job cancelled",
          description: `The job "${job.name}" was cancelled.`,
        });
      } catch (error) {
        console.error("Failed to cancel job:", error);
        toast({
          title: "Cancellation failed",
          description: "There was an error cancelling the job. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{job.name}</h3>
              <p className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Started {startedTimeAgo}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCancel}
              disabled={isLoading}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel job</span>
            </Button>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-sm text-gray-300">{job.progressPercent}%</span>
            </div>
            <Progress value={job.progressPercent} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const JobsInProgress = ({ jobs, onCancelJob, onJobComplete }: JobsInProgressProps) => {
  const [animatedJobs, setAnimatedJobs] = useState<Job[]>(jobs);

  // Update job progress with animation
  useEffect(() => {
    if (jobs.length > 0) {
      const timers = jobs.map(job => {
        // Check if job is complete, then notify parent
        if (job.progressPercent >= 100) {
          onJobComplete(job);
          return undefined;
        }
        
        // Animate the progress for visual smoothness
        return setTimeout(() => {
          setAnimatedJobs(prev => 
            prev.map(j => 
              j.id === job.id ? job : j
            )
          );
        }, 300);
      });
      
      return () => {
        timers.forEach(timer => timer && clearTimeout(timer));
      };
    }
  }, [jobs, onJobComplete]);

  if (jobs.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 shadow-xl mt-6 md:mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Jobs In Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animatedJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onCancel={onCancelJob} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default JobsInProgress;
