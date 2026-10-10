import { createClient } from "@supabase/supabase-js";

/**
 * Supabase clients. Credentials come from the environment only:
 *   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
 *
 * When they are missing (e.g. a local checkout), the clients point at an
 * unreachable placeholder so every data layer falls back to its local JSON store
 * instead of crashing the build.
 */
const PLACEHOLDER_URL = "http://127.0.0.1:54321";
const PLACEHOLDER_KEY = "supabase-not-configured";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || PLACEHOLDER_KEY;

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Public client for anonymous/authenticated visitor requests
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client for protected CMS mutations and background jobs
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
