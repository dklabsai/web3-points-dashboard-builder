
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { 
  getUser, 
  upsertUser, 
  updateUserPoints, 
  getLeaderboard, 
  User 
} from '@/lib/supabaseClient';

export default function useUser() {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch or create user on wallet connect
  useEffect(() => {
    const fetchUser = async () => {
      if (isConnected && address) {
        setLoading(true);
        try {
          // Try to get existing user
          let userData = await getUser(address);
          
          // If user doesn't exist, create one
          if (!userData) {
            userData = await upsertUser(address);
          }
          
          if (userData) {
            setUser(userData);
            setPoints(userData.points || 0);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setPoints(0);
        setIsComputing(false);
      }
    };

    fetchUser();
  }, [isConnected, address]);

  // Fetch leaderboard and calculate rank
  const fetchLeaderboard = useCallback(async () => {
    if (!isConnected || !address) return;

    try {
      const leaderboardData = await getLeaderboard(10);
      setLeaderboard(leaderboardData);

      // Calculate user rank
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('count(*)')
          .gt('points', user.points);
        
        if (data) {
          // Rank is count of users with more points + 1
          setRank((data[0]?.count || 0) + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  }, [isConnected, address, user]);

  // Points accrual system
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let syncInterval: NodeJS.Timeout | null = null;

    if (isConnected && isComputing && address) {
      // Update points every second in the UI
      interval = setInterval(() => {
        setPoints(prev => prev + 1);
      }, 1000);

      // Sync to Supabase every 5 seconds
      syncInterval = setInterval(async () => {
        if (user) {
          await updateUserPoints(address, points + 1);
          // Update leaderboard after sync
          fetchLeaderboard();
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (syncInterval) clearInterval(syncInterval);
    };
  }, [isConnected, isComputing, address, points, user, fetchLeaderboard]);

  // Toggle compute function
  const toggleCompute = useCallback(() => {
    setIsComputing(prev => !prev);
  }, []);

  // Initial leaderboard fetch
  useEffect(() => {
    if (isConnected) {
      fetchLeaderboard();
    }
  }, [isConnected, fetchLeaderboard]);

  return {
    user,
    points,
    isComputing,
    toggleCompute,
    leaderboard,
    rank,
    loading,
    fetchLeaderboard,
  };
}

// TODO: Future Chainlink Integration
// Replace local timer with on-chain `getPoints()` + event listener
// when Chainlink oracle is enabled. The function would look like:
/*
const fetchOnChainPoints = async () => {
  if (!address || !contract) return;
  try {
    const pointsFromChain = await contract.getPoints(address);
    setPoints(pointsFromChain.toNumber());
  } catch (error) {
    console.error('Error fetching on-chain points:', error);
  }
};
*/
