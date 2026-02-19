const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// User requested hardcoded values for now
const DEFAULT_URL = "https://mvdpuuokpdmowbdaedud.supabase.co";
const DEFAULT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12ZHB1dW9rcGRtb3diZGFlZHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODg5ODAsImV4cCI6MjA4Njg2NDk4MH0.VY99uQJQFX8por1hpcnrkua7casJk8Uh3pGyMKynYEE";

const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
