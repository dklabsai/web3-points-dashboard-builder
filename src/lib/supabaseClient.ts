
import { createClient } from '@supabase/supabase-js';

// Define your DB schema so `from('users')` works correctly
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          wallet: string;
          points: number;
          jobs_completed: number;
          orders_fulfilled: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          wallet: string;
          points?: number;
          jobs_completed?: number;
          orders_fulfilled?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          wallet?: string;
          points?: number;
          jobs_completed?: number;
          orders_fulfilled?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uawkfwpkyrtzddmkxdzw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhd2tmd3BreXJ0emRkbWt4ZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTExMjUsImV4cCI6MjA2MjAyNzEyNX0.k0klnWcj-DYjwBqdZbqLLB7vLgx_2E76Mv5GCaTyu9I';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
