import { create } from "zustand"
import type { User } from "@supabase/supabase-js"

export type UserProfile = {
  id: string
  email: string
  name: string
  phone: string
  avatar_url: string
  role: "user" | "admin"
  badge: "new" | "trusted" | "top" | "verified"
  created_at: string
}

type AuthStore = {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
