
import React from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, Container, ISourceOptions } from "tsparticles-engine";

interface ParticlesBackgroundProps {
  className?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ className }) => {
  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container);
  };

  const options: ISourceOptions = {
    fullScreen: { enable: false, zIndex: 0 },
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 30,
    detectRetina: true,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: { enable: false, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true, delay: 0.5 }
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 }
      }
    },
    particles: {
      number: {
        value: 50,
        density: { enable: true, area: 800 }
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.3 },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" }
      },
      collisions: { enable: false }
    }
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className={className}
    />
  );
};

export default ParticlesBackground;
