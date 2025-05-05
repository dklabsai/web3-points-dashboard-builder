
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

// Import our new components
import { StatsPanel } from '@/components/StatsPanel';
import { ActivityChart } from '@/components/ActivityChart';
import { Leaderboard } from '@/components/Leaderboard';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { 
    user, 
    points, 
    active, 
    toggleActive, 
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
            <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl mb-8">
              <WelcomeHeader user={user} />
              
              <StatsPanel
                points={points}
                jobsCompleted={user?.jobs_completed || 0}
                ordersFulfilled={user?.orders_fulfilled || 0}
                rank={rank}
              />
            </div>

            {/* Activity Chart */}
            <ActivityChart points={points} active={active} />
          </div>
          
          {/* Leaderboard */}
          <div className="lg:col-span-4">
            <Leaderboard 
              items={leaderboard} 
              currentWallet={user?.wallet || ''} 
            />
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
            
            {/* Stats Panel Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
          
          {/* Activity Chart Skeleton */}
          <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <Leaderboard items={[]} currentWallet="" loading={true} />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
