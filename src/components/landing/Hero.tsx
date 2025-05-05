
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [ParticlesComponent, setParticlesComponent] = useState<React.ComponentType<any> | null>(null);

  // Load Particles dynamically to avoid SSR issues
  useEffect(() => {
    let isMounted = true;
    
    const loadParticles = async () => {
      try {
        // Dynamically import the particles libraries
        const { loadFull } = await import("tsparticles");
        const Particles = (await import("react-tsparticles")).default;
        
        const initParticles = async (engine: any) => {
          await loadFull(engine);
        };
        
        // Create a wrapper component for particles
        const ParticlesWrapper = () => (
          <Particles
            id="tsparticles"
            init={initParticles}
            options={{
              fullScreen: { enable: false },
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 30,
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                collisions: {
                  enable: false,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: true,
                  speed: 0.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 50,
                },
                opacity: {
                  value: 0.3,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
            className="absolute inset-0 z-0"
          />
        );
        
        if (isMounted) {
          setParticlesComponent(() => ParticlesWrapper);
        }
      } catch (error) {
        console.error("Failed to load particles:", error);
      }
    };
    
    loadParticles();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start scroll-mt-0"
    >
      {/* Particle Background */}
      <div id="tsparticles" className="absolute inset-0 z-0"></div>
      {ParticlesComponent && (
        <React.Suspense fallback={<div>Loading particles...</div>}>
          <ParticlesComponent />
        </React.Suspense>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900 z-10"></div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 z-20 text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue via-blue-400 to-teal-300"
        >
          dklabs.io
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300"
        >
          The decentralized computing network that rewards your contribution to the future of technology
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {isConnected ? (
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Go to Dashboard
            </Button>
          ) : (
            <div className="scale-110 transform hover:scale-125 transition-transform duration-300">
              <ConnectButton 
                showBalance={false}
                chainStatus="icon" 
                accountStatus="address"
              />
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="lg"
            className="border border-white/30 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Learn More
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div 
                className="w-1 h-2 bg-white rounded-full"
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut" 
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
