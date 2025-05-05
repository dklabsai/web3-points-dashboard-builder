
import React from 'react';

interface StatsPanelProps {
  points: number;
  jobsCompleted: number;
  ordersFulfilled: number;
  rank: number | null;
}

export function StatsPanel({ points, jobsCompleted, ordersFulfilled, rank }: StatsPanelProps) {
  return (
    <div className="stats-panel bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl mb-4">
      <p className="mb-2"><strong>Real‑time Points:</strong> {points} pts</p>
      <p className="mb-2"><strong>Jobs Completed:</strong> {jobsCompleted}</p>
      <p className="mb-2"><strong>Orders Fulfilled:</strong> {ordersFulfilled}</p>
      <p><strong>Your Rank:</strong> {rank ? `#${rank}` : 'N/A'}</p>
    </div>
  );
}
