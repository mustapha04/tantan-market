import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
      throw new Error("Supabase URL and Anon Key are required. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.")
    }
    return {} as ReturnType<typeof createBrowserClient>
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
