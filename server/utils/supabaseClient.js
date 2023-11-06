/*
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
export const supabase = createClient(
  process.env.GTJ_SUPABASE_URL,
  process.env.GTJ_SUPABASE_ANON_KEY
);
*/
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();
const supabase = createClient(
  process.env.GTJ_SUPABASE_URL,
  process.env.GTJ_SUPABASE_ANON_KEY
);

module.exports = {
  supabase,
};

// Not relevant to set up supabase using the string connection
// This is supabase set up using the supabaseClient
