"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/auth"

export function useAuth() {
  const { user, profile, isLoading, setUser, setProfile, setLoading } = useAuthStore()
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single()
        setProfile(data || null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const register = async (email: string, password: string, name: string, phone: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
      },
    })
    if (error) throw error
  }

  const isEmailVerified = !!user?.email_confirmed_at

  const resendVerification = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user?.email || "",
    })
    if (error) throw error
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return { user, profile, isLoading, isEmailVerified, login, register, resendVerification, logout }
}
