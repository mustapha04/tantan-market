"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Locale, categories, neighborhoods, neighborhoodsFr, neighborhoodsEn, getCategoryLabel } from "./translations"

export type { Locale }
export { categories, neighborhoods, neighborhoodsFr, neighborhoodsEn, getCategoryLabel }

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  dir: "rtl" | "ltr"
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar")

  useEffect(() => {
    const saved = localStorage.getItem("tantan-locale") as Locale | null
    if (saved && ["ar", "fr", "en"].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem("tantan-locale", l)
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = locale
  }, [locale])

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[locale]?.[key] || translations["en"]?.[key] || key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{{${k}}}`, String(v))
      })
    }
    return text
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir: locale === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
