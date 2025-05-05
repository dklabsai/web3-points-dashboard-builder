
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Types for our database tables
export type User = {
  wallet: string;
  points: number;
  jobs_completed: number;
  orders_fulfilled: number;
  created_at?: string;
};

// Database operations
export const getUser = async (wallet: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet', wallet)
    .single();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return data;
};

export const upsertUser = async (wallet: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .upsert({ wallet })
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting user:', error);
    return null;
  }
  
  return data;
};

export const updateUserPoints = async (wallet: string, points: number): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .update({ points })
    .eq('wallet', wallet);
  
  if (error) {
    console.error('Error updating user points:', error);
  }
};

export const getLeaderboard = async (limit: number = 10): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('points', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
  
  return data || [];
};
