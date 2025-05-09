
import React from 'react';
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

const HeroContent: React.FC = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  return (
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
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
            </button>
          )}
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
  );
};

export default HeroContent;
