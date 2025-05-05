
import { motion } from 'framer-motion';
import { User } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

interface WelcomeHeaderProps {
  user: User | null;
  loading?: boolean;
}

const WelcomeHeader = ({ user, loading = false }: WelcomeHeaderProps) => {
  if (loading || !user) {
    return (
      <div className="mb-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h2 className="text-2xl font-bold mb-2">
        Welcome, {user.wallet.slice(0, 6)}...{user.wallet.slice(-4)}
      </h2>
      <p className="text-gray-400">
        Your GPU is helping build the decentralized computing network
      </p>
    </motion.div>
  );
};

export default WelcomeHeader;
