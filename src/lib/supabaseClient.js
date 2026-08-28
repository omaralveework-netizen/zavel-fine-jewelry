import { createClient } from '@supabase/supabase-js'

// --------------------------------------------------------------------------
// Connect this app to your Supabase project:
//
// 1. Create a project at https://supabase.com
// 2. In Supabase: Project Settings -> API, copy "Project URL" and "anon public" key
// 3. Locally: copy .env.example to .env and paste the two values in
// 4. On Netlify: Site configuration -> Environment variables, add
//      VITE_SUPABASE_URL
//      VITE_SUPABASE_ANON_KEY
//    then redeploy (Netlify only bakes env vars in at build time)
// 5. Run supabase/schema.sql in the Supabase SQL editor to create the
//    `products` table, storage bucket, and seed the starting catalog
// --------------------------------------------------------------------------

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  // The app still renders using local seed data (see src/data/seedProducts.js)
  // so the storefront looks correct in preview even before Supabase is wired up.
  // eslint-disable-next-line no-console
  console.warn(
    '[ZAVEL] Supabase env vars are not set. Showing local sample data. ' +
      'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the live database and Admin Portal.'
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
