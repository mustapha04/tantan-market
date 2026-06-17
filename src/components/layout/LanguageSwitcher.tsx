"use client"

import { useI18n, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils/cn"
import { useState } from "react"
import { Globe } from "lucide-react"

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "ar", label: "العربية", flag: "🇲🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{languages.find((l) => l.code === locale)?.flag}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 min-w-[140px] rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLocale(lang.code); setOpen(false) }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                  locale === lang.code
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700",
                )}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
