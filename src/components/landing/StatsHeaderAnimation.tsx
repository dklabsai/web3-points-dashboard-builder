
import React, { useEffect } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';

interface BarProps {
  controls: AnimationControls;
  i: number;
}

const Bar: React.FC<BarProps> = ({ controls, i }) => (
  <motion.div
    custom={i}
    animate={controls}
    initial={{ scaleY: 0.2 }}
    style={{ originY: 1 }}
    className="w-2 sm:w-3 bg-gradient-to-t from-blue-400 via-teal-300 to-purple-600 rounded"
  />
);

export const StatsHeaderAnimation: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    // start a looping staggered rise-and-fall
    controls.start((i: number) => ({
      scaleY: [0.3, 1.2, 0.5],
      transition: {
        delay: i * 0.15,
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }));
  }, [controls]);

  return (
    <div className="flex items-end justify-center mb-4 space-x-1 sm:space-x-2 h-16">
      {[0,1,2,3,4].map(i => (
        <Bar key={i} controls={controls} i={i} />
      ))}
    </div>
  );
};
