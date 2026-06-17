"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

export default function LoginPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success(t("auth.loginSuccess"))
      router.push("/")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : ""
      if (message.includes("Email not confirmed") || message.includes("email_not_confirmed")) {
        toast.error(t("auth.verifyEmailRequired"))
      } else {
        toast.error(t("auth.invalidCredentials"))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">{t("auth.login")}</h1>
            <p className="text-sm text-gray-500">{t("auth.noAccount")} <Link href="/register" className="text-blue-600 hover:underline">{t("auth.register")}</Link></p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label={t("auth.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
            />
            <Input
              id="password"
              label={t("auth.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              {t("auth.login")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
