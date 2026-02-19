import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mvdpuuokpdmowbdaedud.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12ZHB1dW9rcGRtb3diZGFlZHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODg5ODAsImV4cCI6MjA4Njg2NDk4MH0.VY99uQJQFX8por1hpcnrkua7casJk8Uh3pGyMKynYEE"; // keep same key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
