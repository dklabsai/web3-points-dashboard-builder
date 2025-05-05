
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

// Import components
import { StatsPanel } from '@/components/StatsPanel';
import { ActivityChart } from '@/components/ActivityChart';
import { Leaderboard } from '@/components/Leaderboard';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import { Button } from '@/components/ui/button';
import { Power } from 'lucide-react';

// GPU models for earnings estimation (moved from LandingPage)
const GPU_MODELS = {
  'NVIDIA RTX 3060': 0.75,
  'NVIDIA RTX 3070': 1.15,
  'NVIDIA RTX 3080': 1.65,
  'NVIDIA RTX 3090': 2.10,
  'NVIDIA RTX 4070': 1.45,
  'NVIDIA RTX 4080': 2.25,
  'NVIDIA RTX 4090': 3.00,
};

const Dashboard = () => {
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

  if (loading) {
    return <DashboardSkeleton />;
  }

  // If user is not connected, show the landing page content
  if (!isConnected) {
    return <LandingContent />;
  }

  // User is connected, show dashboard
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Stats */}
          <div className="lg:col-span-8">
            <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl mb-8">
              <WelcomeHeader user={user} />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <StatsPanel
                  points={points}
                  jobsCompleted={user?.jobs_completed || 0}
                  ordersFulfilled={user?.orders_fulfilled || 0}
                  rank={rank}
                />
                
                <Button 
                  onClick={toggleActive} 
                  variant={active ? "destructive" : "default"}
                  className={`${active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} mt-4 md:mt-0 md:ml-4`}
                >
                  <Power className="mr-2" />
                  {active ? 'Stop Computing' : 'Start Computing'}
                </Button>
              </div>
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

// Landing content for users who aren't connected
const LandingContent = () => {
  const [selectedGPU, setSelectedGPU] = useState<string>('');
  const [hourlyEstimate, setHourlyEstimate] = useState<number | null>(null);

  const handleGPUChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gpu = e.target.value;
    setSelectedGPU(gpu);
    
    if (gpu && gpu in GPU_MODELS) {
      setHourlyEstimate(GPU_MODELS[gpu as keyof typeof GPU_MODELS]);
    } else {
      setHourlyEstimate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Background gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
          zIndex: 0
        }}
      ></div>

      {/* Animated GPU images */}
      <motion.div 
        className="absolute inset-0 z-10 opacity-30" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.img
            key={i}
            src="https://cdn.jsdelivr.net/gh/nvidia-archive/nvidia-opengl/nvidia-gllogo.png"
            className="absolute"
            style={{
              width: `${Math.random() * 100 + 100}px`,
              filter: 'blur(2px) brightness(1.5)',
            }}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight, 
              opacity: 0.3 
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent" 
            style={{ backgroundImage: 'linear-gradient(to right, #00C8FF, #92FE9D)' }}>
            dklabs.io
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">
            Rent out your GPU. Earn points. Join the decentralized computing revolution.
          </p>
          
          <div className="flex justify-center mb-12">
            <ConnectButton />
          </div>
        </motion.div>

        {/* Earnings Calculator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl w-full max-w-md border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Estimate Earnings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="gpu-model" className="block text-sm font-medium mb-2">
                Select your GPU model
              </label>
              <select
                id="gpu-model"
                value={selectedGPU}
                onChange={handleGPUChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a GPU model</option>
                {Object.keys(GPU_MODELS).map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            
            {hourlyEstimate !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-blue-900/50"
              >
                <p className="text-center">
                  <span className="block text-lg font-semibold text-white">Estimated hourly earnings:</span>
                  <span className="block text-3xl font-bold text-green-400 mt-2">
                    ${hourlyEstimate.toFixed(2)}
                  </span>
                  <span className="block text-sm text-gray-400 mt-1">
                    That's ${(hourlyEstimate * 24).toFixed(2)} per day!
                  </span>
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
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
            <Skeleton className="h-48 w-full mb-2" />
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <Leaderboard items={[]} currentWallet="" loading={true} />
        </div>
      </div>
    </div>
  </div>
);

// Add missing useState import
import { useState } from 'react';

export default Dashboard;
