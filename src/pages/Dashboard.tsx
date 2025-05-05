
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { 
    user, 
    points, 
    isComputing, 
    toggleCompute, 
    leaderboard, 
    rank, 
    loading 
  } = useUser();

  // Redirect to landing if not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Stats */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Welcome, {user?.wallet.slice(0, 6)}...{user?.wallet.slice(-4)}</h2>
              <p className="text-gray-400 mb-6">Your GPU is helping build the decentralized computing network</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Compute-Time Points</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">{points}</span>
                    <span className="ml-2 text-sm text-green-400">
                      {isComputing && '+ 1 pt/sec'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={toggleCompute}
                      className={`px-4 py-2 rounded-md w-full font-medium transition-colors ${
                        isComputing 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {isComputing ? 'Stop Compute' : 'Start Compute'}
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
            </motion.div>

            {/* Activity Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4">Computing Activity</h2>
              <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Activity chart coming soon</p>
              </div>
            </motion.div>
          </div>
          
          {/* Leaderboard */}
          <div className="lg:col-span-4">
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
                      leaderUser.wallet === user?.wallet ? 'bg-blue-900/30 border border-blue-800' : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="font-bold text-gray-400 w-8">{index + 1}</div>
                    <div className="flex-1 truncate">
                      {leaderUser.wallet.slice(0, 6)}...{leaderUser.wallet.slice(-4)}
                      {leaderUser.wallet === user?.wallet && (
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
              
              {rank && rank > 10 && user && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center p-3 bg-gray-800/30 rounded-lg">
                    <div className="font-bold text-gray-400 w-8">#{rank}</div>
                    <div className="flex-1 truncate">
                      {user.wallet.slice(0, 6)}...{user.wallet.slice(-4)}
                      <span className="ml-1 text-xs bg-blue-900 text-blue-300 px-1 py-0.5 rounded">You</span>
                    </div>
                    <div className="font-bold">{user.points} pts</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-950 text-white">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96 mb-6" />
            
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
          </div>
        </div>
        
        <div className="lg:col-span-4">
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
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
