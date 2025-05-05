
import React from 'react';
import Particles from "@tsparticles/react";
import type { Engine, Container } from "tsparticles-engine";
import { loadSlim } from "@tsparticles/slim";

interface ParticlesBackgroundProps {
  className?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ className }) => {
  const particlesInit = (engine: Engine): Promise<void> => {
    return loadSlim(engine);
  };

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
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
            density: { enable: true, value_area: 800 }
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
      }}
      className={className}
    />
  );
};

export default ParticlesBackground;
