"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const { t } = useI18n()
  const { register } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(email, password, name, phone)
      toast.success(t("auth.registerSuccess"))
      router.push("/verify-email")
    } catch {
      toast.error(t("auth.error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">{t("auth.register")}</h1>
            <p className="text-sm text-gray-500">{t("auth.haveAccount")} <Link href="/login" className="text-blue-600 hover:underline">{t("auth.login")}</Link></p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="name" label={t("auth.name")} value={name} onChange={(e) => setName(e.target.value)} required />
            <Input id="email" label={t("auth.email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required dir="ltr" />
            <Input id="phone" label={t("auth.phone")} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required dir="ltr" />
            <Input id="password" label={t("auth.password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              {t("auth.register")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
