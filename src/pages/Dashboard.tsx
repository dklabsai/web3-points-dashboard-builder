
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUser } from '@/hooks/useUser';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

// Import components
import { StatsPanel } from '@/components/StatsPanel';
import { ActivityChart } from '@/components/ActivityChart';
import { Leaderboard } from '@/components/Leaderboard';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import { Button } from '@/components/ui/button';
import { Power, ArrowRight, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-8">
          <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 shadow-xl mb-6">
            <WelcomeHeader user={user} />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="w-full">
                <StatsPanel
                  points={points}
                  jobsCompleted={user?.jobs_completed || 0}
                  ordersFulfilled={user?.orders_fulfilled || 0}
                  rank={rank}
                />
              </div>
              
              <div className="w-full max-w-xs flex flex-col gap-3">
                <Button 
                  onClick={toggleActive} 
                  variant={active ? "destructive" : "default"}
                  className={`${active ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} w-full`}
                  size="lg"
                >
                  <Power className="mr-2" />
                  {active ? 'Stop Computing' : 'Start Computing'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Zap className="mr-2" size={18} />
                  Boost Earnings
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <ActivityChart points={points} active={active} />
          
          {/* Available Tasks */}
          <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 shadow-xl mt-6 md:mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Available Tasks</h2>
              <Button variant="ghost" size="sm" className="text-blue-400 flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "AI Model Training", reward: 25, difficulty: "Medium", status: "open" },
                { title: "Data Processing Task", reward: 15, difficulty: "Easy", status: "open" },
                { title: "Render Animation Sequence", reward: 40, difficulty: "Hard", status: "open" }
              ].map((task, i) => (
                <Card key={i} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <span className="bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded-md text-xs">
                            {task.difficulty}
                          </span>
                          <span>{task.reward} pts</span>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" className="mt-2 sm:mt-0 w-full sm:w-auto">Claim Task</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="lg:col-span-4">
          <Leaderboard 
            items={leaderboard} 
            currentWallet={user?.wallet || ''} 
          />
          
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 shadow-xl mt-6 md:mt-8"
          >
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: "Earned points", amount: "+10 pts", time: "5m ago" },
                { action: "Completed job", amount: "+25 pts", time: "1h ago" },
                { action: "Started computing", amount: "", time: "2h ago" },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <p className="text-green-400 font-medium">{activity.amount}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
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
      <div className="relative z-20 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent" 
            style={{ backgroundImage: 'linear-gradient(to right, #00C8FF, #92FE9D)' }}>
            dklabs.io
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 md:mb-10 max-w-2xl mx-auto">
            Rent out your GPU. Earn points. Join the decentralized computing revolution.
          </p>
          
          <div className="flex justify-center mb-10 md:mb-12">
            <ConnectButton />
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 md:mb-20 w-full max-w-4xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: "Connect", 
                description: "Connect your wallet securely to get started", 
                icon: "🔗" 
              },
              { 
                title: "Share", 
                description: "Share your GPU's computing power with the network", 
                icon: "💻" 
              },
              { 
                title: "Earn", 
                description: "Earn rewards in tokens and points for your contribution", 
                icon: "💰" 
              }
            ].map((step, i) => (
              <div key={i} className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 text-center">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{step.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Earnings Calculator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gray-900/70 backdrop-blur-lg p-6 md:p-8 rounded-xl w-full max-w-md border border-gray-800"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Estimate Earnings</h2>
          
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

export default Dashboard;
