
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

// Example GPU models with hashrates
const gpuModels = [
  { name: "NVIDIA RTX 4090", hashrate: 240 },
  { name: "NVIDIA RTX 4080", hashrate: 180 },
  { name: "NVIDIA RTX 3090", hashrate: 120 },
  { name: "NVIDIA RTX 3080", hashrate: 100 },
  { name: "NVIDIA RTX 3070", hashrate: 60 },
  { name: "AMD RX 7900 XTX", hashrate: 110 },
  { name: "AMD RX 6900 XT", hashrate: 65 },
];

export const EarningsEstimator = () => {
  const [selectedGpu, setSelectedGpu] = useState(gpuModels[0].name);
  const [hashrate, setHashrate] = useState(gpuModels[0].hashrate);
  const [hoursPerDay, setHoursPerDay] = useState(12);
  const [displayEarnings, setDisplayEarnings] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(0);

  // Calculate earnings
  const calculateEarnings = () => {
    const gpuInfo = gpuModels.find(gpu => gpu.name === selectedGpu) || gpuModels[0];
    const pointsPerDay = gpuInfo.hashrate * hoursPerDay / 10;
    const earningsPerDay = pointsPerDay * 0.25; // Example conversion rate
    
    return { pointsPerDay, earningsPerDay };
  };

  useEffect(() => {
    // Update hashrate when GPU changes
    const gpuInfo = gpuModels.find(gpu => gpu.name === selectedGpu);
    if (gpuInfo) setHashrate(gpuInfo.hashrate);
    
    // Calculate new values
    const { pointsPerDay, earningsPerDay } = calculateEarnings();
    
    // Animate to new values
    const pointsAnimation = setInterval(() => {
      setDisplayPoints(prev => {
        const next = prev + Math.ceil((pointsPerDay - prev) / 10);
        if (Math.abs(next - pointsPerDay) < 10) {
          clearInterval(pointsAnimation);
          return pointsPerDay;
        }
        return next;
      });
    }, 50);
    
    const earningsAnimation = setInterval(() => {
      setDisplayEarnings(prev => {
        const next = prev + (earningsPerDay - prev) / 10;
        if (Math.abs(next - earningsPerDay) < 0.5) {
          clearInterval(earningsAnimation);
          return earningsPerDay;
        }
        return next;
      });
    }, 50);
    
    return () => {
      clearInterval(pointsAnimation);
      clearInterval(earningsAnimation);
    };
  }, [selectedGpu, hoursPerDay]);

  return (
    <section className="py-20 min-h-screen flex flex-col justify-center bg-gradient-to-b from-gray-900 to-gray-800 snap-start scroll-mt-0">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Estimate Your Earnings</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">See how much you can earn by contributing your computing power to the network</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Estimator Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 md:p-8"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="gpu-select" className="text-lg font-medium text-gray-300">Select your GPU</Label>
              </div>
              <Select 
                value={selectedGpu} 
                onValueChange={setSelectedGpu}
              >
                <SelectTrigger id="gpu-select" className="w-full bg-gray-700/50 border-gray-600">
                  <SelectValue placeholder="Select a GPU" />
                </SelectTrigger>
                <SelectContent>
                  {gpuModels.map((gpu) => (
                    <SelectItem key={gpu.name} value={gpu.name}>
                      {gpu.name} ({gpu.hashrate} MH/s)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-sm text-gray-400">Current hashrate: {hashrate} MH/s</p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="hours-slider" className="text-lg font-medium text-gray-300">Hours per day</Label>
                <span className="text-lg font-semibold text-white">{hoursPerDay}h</span>
              </div>
              <Slider
                id="hours-slider"
                value={[hoursPerDay]}
                min={1}
                max={24}
                step={1}
                onValueChange={(value) => setHoursPerDay(value[0])}
                className="py-4"
              />
              <p className="mt-2 text-sm text-gray-400">How many hours your computer will contribute daily</p>
            </div>
          </motion.div>
          
          {/* Results Display */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gray-800/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Estimated Earnings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/30 backdrop-blur-md rounded-lg p-4 text-center">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Points per day</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="h-4 w-4 text-gray-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Points earned from contributing to the network</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">{Math.round(displayPoints)}</div>
                </div>
                
                <div className="bg-gray-700/30 backdrop-blur-md rounded-lg p-4 text-center">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">F4 Tokens per day</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <Info className="h-4 w-4 text-gray-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Estimated value of points converted to F4 tokens</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-3xl font-bold text-green-400">{displayEarnings.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Monthly Projection</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Points</p>
                    <p className="text-xl font-bold text-white">{Math.round(displayPoints * 30)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">F4 Tokens</p>
                    <p className="text-xl font-bold text-white">{(displayEarnings * 30).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
