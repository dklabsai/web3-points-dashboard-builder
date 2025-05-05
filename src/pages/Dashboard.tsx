
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

// Import refactored components
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import UserStats from '@/components/dashboard/UserStats';
import ActivityChart from '@/components/dashboard/ActivityChart';
import Leaderboard from '@/components/dashboard/Leaderboard';

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
              <UserStats 
                user={user} 
                points={points} 
                active={active} 
                toggleActive={toggleActive} 
                rank={rank} 
              />
            </div>

            {/* Activity Chart */}
            <ActivityChart />
          </div>
          
          {/* Leaderboard */}
          <div className="lg:col-span-4">
            <Leaderboard 
              leaderboard={leaderboard} 
              currentUser={user} 
              rank={rank} 
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
