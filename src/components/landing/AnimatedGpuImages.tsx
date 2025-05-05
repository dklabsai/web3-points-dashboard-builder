
import React from 'react';
import { motion } from "framer-motion";

interface AnimatedGpuImagesProps {
  className?: string;
}

const AnimatedGpuImages: React.FC<AnimatedGpuImagesProps> = ({ className }) => {
  return (
    <motion.div
      className={`absolute inset-0 z-10 opacity-30 ${className}`}
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
  );
};

export default AnimatedGpuImages;
