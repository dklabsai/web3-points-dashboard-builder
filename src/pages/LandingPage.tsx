
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

// GPU models for earnings estimation
const GPU_MODELS = {
  'NVIDIA RTX 3060': 0.75,
  'NVIDIA RTX 3070': 1.15,
  'NVIDIA RTX 3080': 1.65,
  'NVIDIA RTX 3090': 2.10,
  'NVIDIA RTX 4070': 1.45,
  'NVIDIA RTX 4080': 2.25,
  'NVIDIA RTX 4090': 3.00,
};

const LandingPage = () => {
  const [selectedGPU, setSelectedGPU] = useState<string>('');
  const [hourlyEstimate, setHourlyEstimate] = useState<number | null>(null);

  const handleGPUChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gpu = e.target.value;
    setSelectedGPU(gpu);
    
    if (gpu && gpu in GPU_MODELS) {
      setHourlyEstimate(GPU_MODELS[gpu as keyof typeof GPU_MODELS]);
    } else {
      setHourlyEstimate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Background gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
          zIndex: 0
        }}
      ></div>

      {/* Animated GPU images */}
      <motion.div 
        className="absolute inset-0 z-10 opacity-30" 
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

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent" 
            style={{ backgroundImage: 'linear-gradient(to right, #00C8FF, #92FE9D)' }}>
            dklabs.io
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">
            Rent out your GPU. Earn points. Join the decentralized computing revolution.
          </p>
          
          <div className="flex justify-center mb-12">
            <ConnectButton />
          </div>
        </motion.div>

        {/* Earnings Calculator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl w-full max-w-md border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Estimate Earnings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="gpu-model" className="block text-sm font-medium mb-2">
                Select your GPU model
              </label>
              <select
                id="gpu-model"
                value={selectedGPU}
                onChange={handleGPUChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a GPU model</option>
                {Object.keys(GPU_MODELS).map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            
            {hourlyEstimate !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-blue-900/50"
              >
                <p className="text-center">
                  <span className="block text-lg font-semibold text-white">Estimated hourly earnings:</span>
                  <span className="block text-3xl font-bold text-green-400 mt-2">
                    ${hourlyEstimate.toFixed(2)}
                  </span>
                  <span className="block text-sm text-gray-400 mt-1">
                    That's ${(hourlyEstimate * 24).toFixed(2)} per day!
                  </span>
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
