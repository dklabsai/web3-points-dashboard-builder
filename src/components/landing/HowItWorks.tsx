
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Award, ArrowRight } from 'lucide-react';

const cards = [
  {
    title: "Connect Your GPU",
    icon: <Cpu className="h-8 w-8 text-blue-400" />,
    description: "Link your GPU to our network and start earning immediately. Works with most NVIDIA and AMD GPUs.",
    color: "from-blue-400/20 to-blue-600/20"
  },
  {
    title: "Earn Rewards",
    icon: <Zap className="h-8 w-8 text-yellow-400" />,
    description: "Get paid in F4 tokens for every computation your hardware helps to complete. Real-time tracking.",
    color: "from-yellow-400/20 to-amber-600/20"
  },
  {
    title: "Climb the Ranks",
    icon: <Award className="h-8 w-8 text-green-400" />,
    description: "Build reputation and earn bonuses as you contribute more computing power to the network.",
    color: "from-green-400/20 to-emerald-600/20"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 min-h-screen flex flex-col justify-center bg-gray-900 snap-start scroll-mt-0">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">How It Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Join thousands of users who are already contributing to the decentralized computing revolution</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <FlipCard 
              key={index} 
              card={card} 
              index={index} 
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="group inline-flex items-center gap-2 text-lg text-blue-400 hover:text-blue-300 transition-colors">
            Learn more about our technology
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

interface FlipCardProps {
  card: {
    title: string;
    icon: React.ReactNode;
    description: string;
    color: string;
  };
  index: number;
}

const FlipCard = ({ card, index }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      className="perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label={`Learn about ${card.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div 
        className={`relative w-full h-64 rounded-xl transition-all duration-500 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div 
          className={`absolute inset-0 rounded-xl bg-gradient-to-b ${card.color} backdrop-blur-lg border border-white/10 p-6 flex flex-col items-center justify-center text-center shadow-xl backface-hidden hover:shadow-2xl transform transition-all duration-300 group-hover:scale-105`}
        >
          <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-md">
            {card.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute inset-0 rounded-xl bg-gray-800/90 backdrop-blur-lg border border-white/10 p-6 flex flex-col items-center justify-center text-center backface-hidden transform rotate-y-180 shadow-xl transition-all duration-300 group-hover:scale-105`}
        >
          <p className="text-gray-300">{card.description}</p>
        </div>
      </div>
    </motion.div>
  );
};
