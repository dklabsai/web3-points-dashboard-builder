
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Award, Layers, Wallet } from 'lucide-react';

interface StatsPanelProps {
  points: number;
  jobsCompleted: number;
  ordersFulfilled: number;
  rank: number | null;
}

export function StatsPanel({ points, jobsCompleted, ordersFulfilled, rank }: StatsPanelProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
      <div className="flex flex-wrap items-stretch justify-between gap-4">
        <Card className="flex-1 min-w-[160px] bg-gray-800/50 border-gray-700 rounded-xl">
          <CardContent className="p-6 flex flex-col items-center text-center h-full">
            <Cpu className="w-6 h-6 mb-2 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Total Points</span>
            <span className="mt-1 text-2xl font-bold text-white">{points} <span className="text-base font-normal text-gray-400">pts</span></span>
          </CardContent>
        </Card>
        
        <Card className="flex-1 min-w-[160px] bg-gray-800/50 border-gray-700 rounded-xl">
          <CardContent className="p-6 flex flex-col items-center text-center h-full">
            <Layers className="w-6 h-6 mb-2 text-purple-400" />
            <span className="text-sm font-medium text-gray-400">Jobs Completed</span>
            <span className="mt-1 text-2xl font-bold text-white">{jobsCompleted}</span>
          </CardContent>
        </Card>
        
        <Card className="flex-1 min-w-[160px] bg-gray-800/50 border-gray-700 rounded-xl">
          <CardContent className="p-6 flex flex-col items-center text-center h-full">
            <Award className="w-6 h-6 mb-2 text-green-400" />
            <span className="text-sm font-medium text-gray-400">Your Rank</span>
            <span className="mt-1 text-2xl font-bold text-white">{rank !== null ? `#${rank}` : 'N/A'}</span>
          </CardContent>
        </Card>
        
        <Card className="flex-1 min-w-[160px] bg-gray-800/50 border-gray-700 rounded-xl">
          <CardContent className="p-6 flex flex-col items-center text-center h-full">
            <Wallet className="w-6 h-6 mb-2 text-amber-400" />
            <span className="text-sm font-medium text-gray-400">Orders Fulfilled</span>
            <span className="mt-1 text-2xl font-bold text-white">{ordersFulfilled}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
