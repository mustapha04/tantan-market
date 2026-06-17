"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  const { t, dir } = useI18n()
  const { user, isLoading, isEmailVerified, resendVerification } = useAuth()
  const router = useRouter()
  const [resending, setResending] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isLoading && isEmailVerified) {
      router.replace("/")
    }
    if (!isLoading) {
      setChecking(false)
    }
  }, [isLoading, isEmailVerified, router])

  const handleResend = async () => {
    setResending(true)
    try {
      await resendVerification()
      toast.success(t("auth.resendSuccess"))
    } catch {
      toast.error(t("auth.error"))
    } finally {
      setResending(false)
    }
  }

  if (isLoading || checking) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="animate-spin h-8 w-8 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4" dir={dir}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>

          <h1 className="text-2xl font-bold mb-3">{t("auth.verifyEmailTitle")}</h1>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 whitespace-pre-line">
            {t("auth.verifyEmailMessage")}
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full rounded-xl"
              onClick={() => router.push("/login")}
            >
              {t("auth.verifyEmailButton")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-xl"
              onClick={handleResend}
              loading={resending}
            >
              {t("auth.resendVerification")}
            </Button>
          </div>

          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
            {t("app.name")}
          </p>
        </div>
      </div>
    </div>
  )
}
