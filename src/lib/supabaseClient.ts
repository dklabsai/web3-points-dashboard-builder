
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
const key = import.meta.env.VITE_SUPABASE_ANON_KEY!;
// Specify <Database> so `from('users')` is typed correctly
export const supabase = createClient<Database>(url, key);
