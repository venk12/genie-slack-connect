// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ljubpmzjrxzrjupaosed.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdWJwbXpqcnh6cmp1cGFvc2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzE4MjQsImV4cCI6MjA2MDE0NzgyNH0.1r_pqqf8y5LlUYpZUq6vOKXin0slDHKQL-cX-sOccHQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);