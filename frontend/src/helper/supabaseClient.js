import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kfbtlwyinnertmluttps.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYnRsd3lpbm5lcnRtbHV0dHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNjExNDksImV4cCI6MjA2MzkzNzE0OX0.X0xTrs2bqzsmrhBFfG8bUbDsWHazMBMKb0MrAonrKSA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;