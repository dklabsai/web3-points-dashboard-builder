
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityChartProps {
  points: number;
  active: boolean;
}

export function ActivityChart({ points, active }: ActivityChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState<{name: string, points: number}[]>([
    { name: '1m ago', points: points - 5 },
    { name: '30s ago', points: points - 3 },
    { name: 'Now', points: points }
  ]);
  
  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setData(currentData => {
          const newData = [...currentData];
          newData.shift();
          newData.push({ name: 'Now', points });
          newData[1].name = '30s ago';
          newData[0].name = '1m ago';
          return newData;
        });
      }, 10000); // Update every 10 seconds
      
      return () => clearInterval(interval);
    }
  }, [active, points]);

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Computing Activity</h2>
        <div className={`px-3 py-1 rounded-full text-sm ${active ? 'bg-blue-900/30 text-blue-300' : 'bg-gray-800 text-gray-400'}`}>
          {active ? '⚡ Computing' : '⏸️ Paused'}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151',
                color: '#F9FAFB'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="points" 
              stroke={active ? "#3B82F6" : "#6B7280"} 
              strokeWidth={3}
              dot={{ stroke: active ? "#3B82F6" : "#6B7280", strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: active ? "#3B82F6" : "#6B7280", strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center">
          <div className="relative w-full bg-gray-800/50 h-2 rounded-full overflow-hidden">
            <motion.div
              animate={{ 
                width: active ? `${(points % 100) + 1}%` : "0%" 
              }}
              transition={{ duration: 0.5 }}
              className={`absolute h-full ${active ? 'bg-blue-500' : 'bg-gray-600'}`}
            />
          </div>
          <div className="ml-4 text-sm text-gray-400 w-24">
            {active ? `+${points % 100}/100` : 'Inactive'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
