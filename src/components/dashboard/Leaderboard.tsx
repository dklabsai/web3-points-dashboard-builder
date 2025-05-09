
import { motion } from 'framer-motion';
import { User } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardProps {
  leaderboard: User[];
  currentUser: User | null;
  rank: number | null;
  loading?: boolean;
}

const Leaderboard = ({ leaderboard, currentUser, rank, loading = false }: LeaderboardProps) => {
  if (loading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl sticky top-4"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span>Leaderboard</span>
        <span className="ml-auto text-sm text-gray-400">Top 10</span>
      </h2>
      
      <div className="space-y-1">
        {leaderboard.map((leaderUser, index) => (
          <div 
            key={leaderUser.wallet}
            className={`flex items-center p-3 rounded-lg ${
              leaderUser.wallet === currentUser?.wallet ? 'bg-blue-900/30 border border-blue-800' : 'hover:bg-gray-800/50'
            }`}
          >
            <div className="font-bold text-gray-400 w-8">{index + 1}</div>
            <div className="flex-1 truncate">
              {leaderUser.wallet.slice(0, 6)}...{leaderUser.wallet.slice(-4)}
              {leaderUser.wallet === currentUser?.wallet && (
                <span className="ml-1 text-xs bg-blue-900 text-blue-300 px-1 py-0.5 rounded">You</span>
              )}
            </div>
            <div className="font-bold">{leaderUser.points} pts</div>
          </div>
        ))}
        
        {leaderboard.length === 0 && (
          <div className="text-gray-500 text-center py-6">
            No data available
          </div>
        )}
      </div>
      
      {rank && rank > 10 && currentUser && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center p-3 bg-gray-800/30 rounded-lg">
            <div className="font-bold text-gray-400 w-8">#{rank}</div>
            <div className="flex-1 truncate">
              {currentUser.wallet.slice(0, 6)}...{currentUser.wallet.slice(-4)}
              <span className="ml-1 text-xs bg-blue-900 text-blue-300 px-1 py-0.5 rounded">You</span>
            </div>
            <div className="font-bold">{currentUser.points} pts</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const LeaderboardSkeleton = () => (
  <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl">
    <Skeleton className="h-6 w-32 mb-4" />
    
    <div className="space-y-1">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-center p-3">
          <Skeleton className="h-5 w-8 mr-3" />
          <Skeleton className="h-5 flex-1" />
        </div>
      ))}
    </div>
  </div>
);

export default Leaderboard;
