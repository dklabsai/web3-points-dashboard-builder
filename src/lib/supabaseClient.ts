
import { createClient } from '@supabase/supabase-js';

// Define your DB schema
export type Database = {
  public: {
    Tables: {
      users: {
        Row: { id: string; wallet: string; points: number; jobs_completed: number; orders_fulfilled: number; created_at: string; updated_at: string; };
        Insert: { wallet: string; points?: number; jobs_completed?: number; orders_fulfilled?: number; };
        Update: { wallet?: string; points?: number; jobs_completed?: number; orders_fulfilled?: number; };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

const url = "https://db.uawkfwpkyrtzddmkxdzw.supabase.co";
// Use a hardcoded key since import.meta.env might not be working
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhd2tmd3BreXJ0emRkbWt4ZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTExMjUsImV4cCI6MjA2MjAyNzEyNX0.k0klnWcj-DYjwBqdZbqLLB7vLgx_2E76Mv5GCaTyu9I";

// Specify <Database> so `from('users')` is typed correctly
export const supabase = createClient<Database>(url, key);
