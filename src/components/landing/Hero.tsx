import React from 'react';
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import type { Engine, Container } from "tsparticles-engine";

const Hero = () => {
  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  const particlesLoaded = (container?: Container): void => {
    console.log(container);
  };

  const particlesOptions = {
    fullScreen: {
      enable: false,
      zIndex: 0
    },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window" as const,
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        bounce: false,
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        anim: {
          enable: true,
          minimumValue: 0.1,
          opacity_min: 0.1,
          speed: 1,
          sync: false
        },
        random: true,
        value: 0.5,
      },
      shape: {
        character: {
          fill: false,
          font: "Verdana",
          style: "",
          value: "*",
          weight: "400"
        },
        image: {
          height: 100,
          replace_color: true,
          src: "images/github.svg",
          width: 100
        },
        polygon: {
          nb_sides: 5
        },
        stroke: {
          color: "#000000",
          width: 0
        },
        type: "circle"
      },
      size: {
        anim: {
          enable: false,
          size_min: 0.1,
          speed: 40,
          sync: false
        },
        random: true,
        value: 5,
      },
    },
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

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to right, #00C8FF, #92FE9D)' }}>
            dklabs.io
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 md:mb-10 max-w-2xl mx-auto">
            Rent out your GPU. Earn points. Join the decentralized computing revolution.
          </p>

          <div className="flex justify-center mb-10 md:mb-12">
            <ConnectButton />
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 md:mb-20 w-full max-w-4xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Connect",
                description: "Connect your wallet securely to get started",
                icon: "🔗"
              },
              {
                title: "Share",
                description: "Share your GPU's computing power with the network",
                icon: "💻"
              },
              {
                title: "Earn",
                description: "Earn rewards in tokens and points for your contribution",
                icon: "💰"
              }
            ].map((step, i) => (
              <div key={i} className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800 text-center">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{step.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Earnings Calculator */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gray-900/70 backdrop-blur-lg p-6 md:p-8 rounded-xl w-full max-w-md border border-gray-800"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Estimate Earnings</h2>

          {/* GPU Dropdown and Earnings Estimate - omitted for brevity */}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
