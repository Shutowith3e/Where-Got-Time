import {createClient} from "@supabase/supabase-js";
import env from "dotenv";
env.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "YOUR_SUPABASE_URL",
  process.env.SUPABASE_KEY || "YOUR_SUPABASE_KEY"
);
// module.exports = supabase;
export default supabase;
// shld be all