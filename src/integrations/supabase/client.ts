// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ysydsrndvrwgnykkxovq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeWRzcm5kdnJ3Z255a2t4b3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjI4NjUsImV4cCI6MjA2MTg5ODg2NX0.p938YqsiJn9kdj6nZGj_0XrNpjwACf95fwvzPgwXGSk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);