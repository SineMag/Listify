import { createClient } from "@supabase/supabase-js";

// Get environment variables - Expo automatically loads .env files
// Variables must be prefixed with EXPO_PUBLIC_ to be accessible in the app
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file. See .env.example for reference."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

