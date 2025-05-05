
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Check, BarChart } from 'lucide-react';

interface StatsPanelProps {
  points: number;
  jobsCompleted: number;
  ordersFulfilled: number;
  rank: number | null;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ 
  points, 
  jobsCompleted, 
  ordersFulfilled, 
  rank 
}) => {
  return (
    <>
      <div className="flex-1 min-w-[160px] bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center" role="group" aria-label="Total Points">
        <BarChart className="w-6 h-6 mb-2 text-blue-400" />
        <span className="text-sm font-medium text-gray-400">Total Points</span>
        <span className="mt-1 text-2xl font-bold text-white">{points} <span className="text-base font-normal text-gray-400">pts</span></span>
      </div>
      
      <div className="flex-1 min-w-[160px] bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center" role="group" aria-label="Jobs Completed">
        <Check className="w-6 h-6 mb-2 text-green-400" />
        <span className="text-sm font-medium text-gray-400">Jobs Completed</span>
        <span className="mt-1 text-2xl font-bold text-white">{jobsCompleted}</span>
      </div>
      
      <div className="flex-1 min-w-[160px] bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center" role="group" aria-label="Orders Fulfilled">
        <Clock className="w-6 h-6 mb-2 text-purple-400" />
        <span className="text-sm font-medium text-gray-400">Orders Fulfilled</span>
        <span className="mt-1 text-2xl font-bold text-white">{ordersFulfilled}</span>
      </div>
      
      <div className="flex-1 min-w-[160px] bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center" role="group" aria-label="Rank">
        <Award className="w-6 h-6 mb-2 text-yellow-400" />
        <span className="text-sm font-medium text-gray-400">Rank</span>
        <span className="mt-1 text-2xl font-bold text-white">
          {rank ? `#${rank}` : 'N/A'}
        </span>
      </div>
    </>
  );
};
