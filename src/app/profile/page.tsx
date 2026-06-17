"use client"

import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfileRedirectPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(`/profile/${user.id}`)
    } else {
      router.push("/login")
    }
  }, [user])

  return null
}
