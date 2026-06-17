"use client"

import { useI18n } from "@/lib/i18n"
import { Logo } from "@/components/ui/Logo"
import Link from "next/link"
import { Mail, Phone, MessageCircle, Facebook, Instagram, MapPin } from "lucide-react"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-[#0F2D5C] text-white mt-auto">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-3 [&_span]:text-white" size="md" />
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={14} />
              <span className="text-sm">طانطان، المغرب</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">{t("nav.listings")}</h3>
            <div className="space-y-2.5">
              <Link href="/listings" className="block text-sm text-white/60 hover:text-white transition-colors">{t("nav.listings")}</Link>
              <Link href="/listings/new" className="block text-sm text-white/60 hover:text-white transition-colors">{t("nav.sell")}</Link>
              <Link href="/auctions" className="block text-sm text-white/60 hover:text-white transition-colors">{t("nav.auctions")}</Link>
              <Link href="/listings" className="block text-sm text-white/60 hover:text-white transition-colors">{t("home.categories")}</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">{t("footer.contact")}</h3>
            <div className="space-y-2.5">
              <a href="mailto:contact@tantanmarket.ma" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={14} />
                contact@tantanmarket.ma
              </a>
              <a href="tel:+212628000000" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={14} />
                +212 6 28 00 00 00
              </a>
              <a href="https://wa.me/212628000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">{t("footer.followUs")}</h3>
            <div className="flex items-center gap-3 mb-6">
              <a href="#" className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/212628000000" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-white/60 hover:text-white transition-colors">{t("footer.about")}</Link>
              <Link href="/privacy" className="block text-sm text-white/60 hover:text-white transition-colors">{t("footer.privacy")}</Link>
              <Link href="/terms" className="block text-sm text-white/60 hover:text-white transition-colors">{t("footer.terms")}</Link>
              <Link href="/help" className="block text-sm text-white/60 hover:text-white transition-colors">{t("footer.help")}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-main py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-white/50">{t("footer.rights")}</p>
          <p className="text-xs text-white/30">صنع بـ ❤️ في طانطان</p>
        </div>
      </div>
    </footer>
  )
}
