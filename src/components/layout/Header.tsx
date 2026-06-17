"use client"

import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/hooks/useAuth"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { Logo } from "@/components/ui/Logo"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, Plus, MessageCircle, LogOut, User, LayoutDashboard, Search } from "lucide-react"
import { Button } from "../ui/Button"

export function Header() {
  const { t, dir } = useI18n()
  const { user, profile, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/listings", label: t("nav.listings") },
    { href: "/auctions", label: t("nav.auctions") },
    { href: "/listings", label: t("nav.categories") },
    { href: "/about", label: t("nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 shadow-sm">
      <div className="container-main">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" className="flex items-center shrink-0">
              <Logo size="lg" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-[var(--primary)] hover:bg-orange-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1 max-w-sm hidden xl:block relative">
            <form
              onSubmit={(e) => { e.preventDefault(); if (searchQuery) window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}` }}
            >
              <div className="relative">
                <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("nav.search")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pe-4 ps-9 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/15 focus:bg-white transition-all"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={16} />}
              onClick={() => window.location.href = "/listings/new"}
              className="hidden sm:flex rounded-xl px-4"
            >
              {t("nav.sell")}
            </Button>

            {user ? (
              <>
                <Link href="/chat" className="p-2 rounded-xl hover:bg-gray-100 relative">
                  <MessageCircle size={20} className="text-gray-600" />
                </Link>

                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-medium">
                      {profile?.name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                  </button>
                  <div className="absolute top-full mt-1 end-0 min-w-[180px] rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-3 py-2 text-sm font-medium border-b border-gray-100 mb-1">
                      {profile?.name || user.email}
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-gray-50">
                      <LayoutDashboard size={16} /> {t("nav.dashboard")}
                    </Link>
                    <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-gray-50">
                      <User size={16} /> {t("nav.profile")}
                    </Link>
                    {profile?.role === "admin" && (
                      <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-gray-50">
                        <LayoutDashboard size={16} /> {t("nav.admin")}
                      </Link>
                    )}
                    <button onClick={logout} className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                      <LogOut size={16} /> {t("nav.logout")}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="rounded-xl">{t("nav.login")}</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm" className="rounded-xl">{t("nav.register")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container-main py-3 space-y-1">
            <div className="relative mb-3">
              <form onSubmit={(e) => { e.preventDefault(); if (searchQuery) window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}` }}>
                <div className="relative">
                  <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("nav.search")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pe-4 ps-9 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/15"
                  />
                </div>
              </form>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <hr className="my-2 border-gray-200" />
                <Link href="/listings/new" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--primary)] hover:bg-orange-50">
                  <Plus size={18} /> {t("nav.sell")}
                </Link>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">
                  <LayoutDashboard size={18} /> {t("nav.dashboard")}
                </Link>
                <Link href="/chat" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">
                  <MessageCircle size={18} /> {t("nav.chat")}
                </Link>
                {profile?.role === "admin" && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">
                    <LayoutDashboard size={18} /> {t("nav.admin")}
                  </Link>
                )}
                <button onClick={() => { logout(); setMobileOpen(false) }} className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer">
                  <LogOut size={18} /> {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <hr className="my-2 border-gray-200" />
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">
                  {t("nav.login")}
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--primary)] hover:bg-orange-50">
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
