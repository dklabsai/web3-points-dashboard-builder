
import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
