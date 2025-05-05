
import { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { supabase, Database } from '@/lib/supabaseClient';

interface UserProfile {
  wallet: string;
  points: number;
  jobs_completed: number;
  orders_fulfilled: number;
}

interface UseUserReturn {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  points: number;
  active: boolean;
  leaderboard: UserProfile[];
  rank: number | null;
  toggleActive: () => void;
}

export function useUser(): UseUserReturn {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [points, setPoints] = useState(0);
  const [active, setActive] = useState(false);
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // We'll store the interval reference in a ref to avoid dependency issues
  const [pointsInterval, setPointsInterval] = useState<NodeJS.Timeout | null>(null);

  const loadUserProfile = useCallback(async (wallet: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({ wallet }, { onConflict: 'wallet' })
        .select();
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return null;
      }
      
      // Use the first item if data is an array
      const userData = Array.isArray(data) ? data[0] : data;
      
      if (!userData) {
        setError("No user data returned");
        setLoading(false);
        return null;
      }
      
      const profile: UserProfile = {
        wallet: userData.wallet,
        points: userData.points || 0,
        jobs_completed: userData.jobs_completed || 0,
        orders_fulfilled: userData.orders_fulfilled || 0,
      };
      
      setUser(profile);
      setPoints(profile.points);
      setLoading(false);
      return profile;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
      setLoading(false);
      return null;
    }
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      loadUserProfile(address);
    } else {
      setUser(null);
      setPoints(0);
      setLeaderboard([]);
      setRank(null);
    }
  }, [isConnected, address, loadUserProfile]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('users')
          .select('wallet, points')
          .order('points', { ascending: false })
          .limit(10);
          
        if (error) {
          console.error('Error fetching leaderboard:', error);
          return;
        }
          
        if (data) {
          setLeaderboard(data);
          const pos = data.findIndex(u => u.wallet === user.wallet);
          setRank(pos !== -1 ? pos + 1 : null);
        }
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };
    
    if (user) fetchLeaderboard();
  }, [user, points]);

  useEffect(() => {
    // Clean up previous interval if it exists
    if (pointsInterval) {
      clearInterval(pointsInterval);
      setPointsInterval(null);
    }
    
    // If active, create a new interval
    if (active) {
      const interval = setInterval(() => setPoints(p => p + 1), 1000);
      setPointsInterval(interval);
    }
    
    // Cleanup on unmount or when active changes
    return () => {
      if (pointsInterval) clearInterval(pointsInterval);
    };
  }, [active]);

  useEffect(() => {
    if (!user) return;
    
    if (active) {
      // Sync points to Supabase every 5 seconds while active
      const syncInterval = setInterval(() => {
        supabase.from('users').update({ points }).eq('wallet', user.wallet);
      }, 5000);
      
      return () => clearInterval(syncInterval);
    } else {
      // Sync points when toggling from active to inactive
      supabase.from('users').update({ points }).eq('wallet', user.wallet);
    }
  }, [active, user, points]);

  const toggleActive = () => setActive(a => !a);

  return { user, loading, error, points, active, leaderboard, rank, toggleActive };
}
