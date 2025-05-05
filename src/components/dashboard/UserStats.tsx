
import { motion } from 'framer-motion';
import { User } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

interface UserStatsProps {
  user: User | null;
  points: number;
  active: boolean;
  toggleActive: () => void;
  rank: number | null;
}

const UserStats = ({ user, points, active, toggleActive, rank }: UserStatsProps) => {
  if (!user) return <StatsSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-gray-300 mb-2">Compute-Time Points</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-white">{points}</span>
          <span className="ml-2 text-sm text-green-400">
            {active && '+ 1 pt/sec'}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={toggleActive}
            className={`px-4 py-2 rounded-md w-full font-medium transition-colors ${
              active 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {active ? 'Stop Compute' : 'Start Compute'}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-gray-300 mb-2">Your Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Jobs Completed</span>
            <span className="font-bold">{user?.jobs_completed || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Orders Fulfilled</span>
            <span className="font-bold">{user?.orders_fulfilled || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Leaderboard Rank</span>
            <span className="font-bold">
              {rank ? `#${rank}` : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <Skeleton className="h-5 w-36 mb-2" />
      <Skeleton className="h-10 w-20 mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
    
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <Skeleton className="h-5 w-36 mb-2" />
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  </div>
);

export default UserStats;
