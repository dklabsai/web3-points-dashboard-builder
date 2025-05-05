
import React from 'react';
import ParticlesBackground from './ParticlesBackground';
import AnimatedGpuImages from './AnimatedGpuImages';
import HeroContent from './HeroContent';

const Hero = () => {
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
      <AnimatedGpuImages />

      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground className="absolute inset-0" />
      </div>

      {/* Content */}
      <HeroContent />
    </div>
  );
};

export default Hero;
