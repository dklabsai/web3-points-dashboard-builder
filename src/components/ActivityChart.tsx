
import React from 'react';
import { motion } from 'framer-motion';

interface ActivityChartProps {
  points: number;
  active: boolean;
}

export function ActivityChart({ points, active }: ActivityChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl"
    >
      <h2 className="text-xl font-bold mb-4">Computing Activity</h2>
      <div className="relative h-10 bg-gray-800/50 rounded-lg mb-2">
        <motion.div
          animate={{ width: `${(points % 100) + 1}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full rounded-lg ${active ? 'bg-blue-500' : 'bg-gray-600'}`}
        />
      </div>
      <p className={`text-sm ${active ? 'text-blue-400' : 'text-gray-400'}`}>
        {active ? '⚡ Computing in progress...' : '⏸️ Computing paused'}
      </p>
    </motion.div>
  );
}
