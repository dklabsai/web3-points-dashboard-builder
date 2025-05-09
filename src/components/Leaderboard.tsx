
import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeaderboardItem { wallet: string; points: number; }
interface LeaderboardProps {
  items: LeaderboardItem[];
  currentWallet: string;
  loading?: boolean;
}

export function Leaderboard({ items, currentWallet, loading = false }: LeaderboardProps) {
  if (loading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl sticky top-20"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-amber-400" />
          <span>Leaderboard</span>
        </h2>
        <span className="text-sm text-gray-400">Top {items.length}</span>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => {
          // Determine medal for top 3
          let medal = null;
          if (index === 0) medal = <Medal className="h-4 w-4 text-amber-400" />;
          else if (index === 1) medal = <Medal className="h-4 w-4 text-gray-400" />;
          else if (index === 2) medal = <Medal className="h-4 w-4 text-amber-700" />;
          
          return (
            <div 
              key={item.wallet}
              className={`flex items-center p-3 rounded-lg ${
                item.wallet === currentWallet 
                  ? 'bg-blue-900/30 border border-blue-800' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="font-bold text-gray-400 w-8 flex items-center">
                {medal || `#${index + 1}`}
              </div>
              <div className="flex-1 truncate">
                {item.wallet.slice(0, 6)}...{item.wallet.slice(-4)}
                {item.wallet === currentWallet && (
                  <span className="ml-1 text-xs bg-blue-900 text-blue-300 px-1 py-0.5 rounded">You</span>
                )}
              </div>
              <div className="font-bold">{item.points} pts</div>
            </div>
          );
        })}
        
        {items.length === 0 && (
          <div className="text-gray-500 text-center py-6">
            No data available
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <Button variant="outline" className="w-full text-sm" size="sm">
          View Full Leaderboard
        </Button>
      </div>
    </motion.div>
  );
}

const LeaderboardSkeleton = () => (
  <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl">
    <Skeleton className="h-6 w-32 mb-4" />
    
    <div className="space-y-2">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-center p-3">
          <Skeleton className="h-5 w-8 mr-3" />
          <Skeleton className="h-5 flex-1" />
        </div>
      ))}
    </div>
  </div>
);
