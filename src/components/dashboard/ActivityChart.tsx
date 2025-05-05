
import { motion } from 'framer-motion';

const ActivityChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-800 shadow-xl"
    >
      <h2 className="text-xl font-bold mb-4">Computing Activity</h2>
      <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Activity chart coming soon</p>
      </div>
    </motion.div>
  );
};

export default ActivityChart;
