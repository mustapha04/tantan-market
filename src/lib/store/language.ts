import { create } from "zustand"
import type { Locale } from "../i18n/translations"

type LanguageStore = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  locale: "ar",
  setLocale: (locale) => set({ locale }),
}))
