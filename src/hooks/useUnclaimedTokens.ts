
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';

export function useUnclaimedTokens() {
  const { address, isConnected } = useAccount();
  const [unclaimedTokens, setUnclaimedTokens] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUnclaimedTokens = useCallback(async () => {
    if (!isConnected || !address) {
      setUnclaimedTokens(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call - in a real app, this would call your smart contract
      // Using setTimeout to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - this would be the result from your contract
      const tokenAmount = Math.random() * 20; // Random amount between 0 and 20
      setUnclaimedTokens(tokenAmount);
    } catch (err) {
      console.error('Error fetching unclaimed tokens:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [isConnected, address]);

  const claimTokens = useCallback(async () => {
    if (!isConnected || !address || unclaimedTokens <= 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call - in a real app, this would call your smart contract
      // Using setTimeout to simulate network latency
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful claim, reset unclaimed tokens to 0
      setUnclaimedTokens(0);
      
      // Return the claimed amount for display in UI
      return unclaimedTokens;
    } catch (err) {
      console.error('Error claiming tokens:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isConnected, address, unclaimedTokens]);

  // Fetch unclaimed tokens on mount and when account changes
  useEffect(() => {
    fetchUnclaimedTokens();
  }, [fetchUnclaimedTokens]);

  return { 
    unclaimedTokens, 
    loading, 
    error, 
    claimTokens, 
    refreshUnclaimedTokens: fetchUnclaimedTokens 
  };
}
