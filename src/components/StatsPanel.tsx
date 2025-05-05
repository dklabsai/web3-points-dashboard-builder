
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Award, Layers } from 'lucide-react';

interface StatsPanelProps {
  points: number;
  jobsCompleted: number;
  ordersFulfilled: number;
  rank: number | null;
}

export function StatsPanel({ points, jobsCompleted, ordersFulfilled, rank }: StatsPanelProps) {
  return (
    <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="flex items-center p-4">
          <Cpu className="h-7 w-7 text-blue-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400">Total Points</p>
            <p className="text-xl font-bold">{points} pts</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="flex items-center p-4">
          <Layers className="h-7 w-7 text-purple-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400">Jobs Completed</p>
            <p className="text-xl font-bold">{jobsCompleted}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="flex items-center p-4">
          <Award className="h-7 w-7 text-green-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400">Your Rank</p>
            <p className="text-xl font-bold">{rank !== null ? `#${rank}` : 'N/A'}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="flex items-center p-4">
          <Layers className="h-7 w-7 text-amber-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-400">Orders Fulfilled</p>
            <p className="text-xl font-bold">{ordersFulfilled}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
