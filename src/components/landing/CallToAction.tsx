
import React from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export const CallToAction = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  return (
    <section className="py-20 min-h-screen flex flex-col justify-center bg-gradient-to-b from-gray-800 to-gray-900 snap-start scroll-mt-0">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue via-blue-400 to-teal-300">
              Join the Decentralized Computing Revolution
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Be part of the network that's redefining what's possible with distributed GPU power
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mb-10 inline-block"
            >
              {isConnected ? (
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Button>
              ) : (
                <div className="scale-125 transform">
                  <ConnectButton 
                    showBalance={false}
                    chainStatus="icon"
                    accountStatus="address"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-gray-700/40 transition-colors duration-300"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 group font-medium"
            >
              <span>Learn more about our technology</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: <div className="bg-blue-900/30 rounded-full p-3 inline-block">
            <Zap className="h-6 w-6 text-blue-400" />
          </div>,
    title: "Passive Income",
    description: "Earn F4 tokens by contributing your GPU's idle time to the network."
  },
  {
    icon: <div className="bg-purple-900/30 rounded-full p-3 inline-block">
            <svg className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M7.5 12.5L10.5 15.5L16.5 9.5" />
            </svg>
          </div>,
    title: "Secure & Trusted",
    description: "Your data remains private and secure with our advanced encryption protocols."
  },
  {
    icon: <div className="bg-green-900/30 rounded-full p-3 inline-block">
            <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12H18L15 21L9 3L6 12H2" />
            </svg>
          </div>,
    title: "Real-time Analytics",
    description: "Monitor your contribution and earnings in real-time through an intuitive dashboard."
  }
];
