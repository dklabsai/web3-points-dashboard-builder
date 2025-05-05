
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Use the values from our supabase client file
import { supabase as supabaseInstance } from '@/integrations/supabase/client';

// Re-export the supabase client
export const supabase = supabaseInstance;

// Export types for convenience
export type { Database };
