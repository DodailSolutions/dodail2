import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://cnlhegjvxozidrahjmiz.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubGhlZ2p2eG96aWRyYWhqbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NTM1NTUsImV4cCI6MjEwNzEyOTU1NX0.FoN_GozkM1Nzrg6FBKftaKLFTwnSYOO487XVtVhORaQ";
const DEFAULT_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubGhlZ2p2eG96aWRyYWhqbWl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTU1MzU1NSwiZXhwIjoyMTA3MTI5NTU1fQ.B77r-hQyRH23lk_NvUlp6IV5mj-ZsioXDbnS2aZfFVo";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_KEY;

// Public client for anonymous/authenticated visitor requests
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client for protected CMS mutations and background jobs
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
