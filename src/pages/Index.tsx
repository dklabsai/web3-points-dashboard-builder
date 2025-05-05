
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { EarningsEstimator } from '@/components/landing/EarningsEstimator';
import { CallToAction } from '@/components/landing/CallToAction';
import { ScrollProgressBar } from '@/components/landing/ScrollProgressBar';
import { ThemeToggle } from '@/components/landing/ThemeToggle';
import { StatsHeaderAnimation } from '@/components/landing/StatsHeaderAnimation';
import { useTheme } from '@/hooks/useTheme';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Index = () => {
  const { theme } = useTheme();

  // Handle scroll snapping
  useEffect(() => {
    document.body.classList.add('scroll-snap-type-y-mandatory');
    return () => {
      document.body.classList.remove('scroll-snap-type-y-mandatory');
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <ScrollProgressBar />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
            >
              dklabs.io
            </motion.div>
            <StatsHeaderAnimation />
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectButton 
              showBalance={false} 
              chainStatus="icon" 
              accountStatus="address"
            />
          </div>
        </div>
      </header>

      {/* Main Content with Scroll Snap */}
      <main className="scroll-smooth">
        <Hero />
        <HowItWorks />
        <EarningsEstimator />
        <CallToAction />
      </main>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 mt-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>© 2025 dklabs.io - The Decentralized Computing Network</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
