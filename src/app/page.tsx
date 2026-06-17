"use client"

import { useI18n, categories } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { ListingCard } from "@/components/listings/ListingCard"
import { useListings } from "@/hooks/useListings"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, Sparkles, Store, Search, Gavel, Timer, Award, Star, ShieldCheck, Crown, Verified, Users, Package, ShoppingBag, Tag, UserCheck, Plus } from "lucide-react"
import { useState, useEffect } from "react"

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    function calc() {
      const diff = new Date(endTime).getTime() - Date.now()
      if (diff <= 0) return setTimeLeft("انتهى")
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setTimeLeft(`${d}d ${h}h ${m}m`)
    }
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [endTime])

  return (
    <span className="flex items-center gap-1 text-xs font-medium text-white">
      <Timer size={12} />
      {timeLeft}
    </span>
  )
}

const categoryImages = [
  { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format", label: "category.phones" },
  { src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&auto=format", label: "category.electronics" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop&auto=format", label: "category.vehicles" },
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop&auto=format", label: "category.realestate" },
  { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop&auto=format", label: "category.furniture" },
  { src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop&auto=format", label: "category.clothing" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop&auto=format", label: "category.jobs" },
  { src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop&auto=format", label: "category.other" },
]

const heroImages = [
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop&auto=format", label: "category.vehicles" },
  { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&auto=format", label: "category.phones" },
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=600&fit=crop&auto=format", label: "category.realestate" },
  { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&auto=format", label: "category.furniture" },
]

const topSellersMock = [
  { name: "أحمد الشرقاوي", listings: 145, badge: "top", rating: 4.9, avatar: "أ" },
  { name: "فاطمة المرزوقي", listings: 98, badge: "trusted", rating: 4.8, avatar: "ف" },
  { name: "يوسف الكنوني", listings: 72, badge: "verified", rating: 4.7, avatar: "ي" },
  { name: "سارة البوعناني", listings: 55, badge: "trusted", rating: 4.7, avatar: "س" },
  { name: "محمد الدرهم", listings: 41, badge: "new", rating: 4.5, avatar: "م" },
  { name: "نورة التازي", listings: 38, badge: "new", rating: 4.4, avatar: "ن" },
]

function SellerBadge({ badge }: { badge: string }) {
  if (badge === "top") return <Crown size={14} className="text-yellow-500" />
  if (badge === "trusted") return <ShieldCheck size={14} className="text-green-500" />
  if (badge === "verified") return <Verified size={14} className="text-blue-500" />
  if (badge === "new") return <Sparkles size={14} className="text-orange-400" />
  return null
}

function SellerLabel({ badge }: { badge: string }) {
  if (badge === "top") return <span className="text-[10px] font-medium text-yellow-600">Top Seller</span>
  if (badge === "trusted") return <span className="text-[10px] font-medium text-green-600">Trusted</span>
  if (badge === "verified") return <span className="text-[10px] font-medium text-blue-600">Verified</span>
  if (badge === "new") return <span className="text-[10px] font-medium text-orange-500">New</span>
  return null
}

export default function HomePage() {
  const { t, locale, dir } = useI18n()
  const { listings: recentListings, loading } = useListings({ sortBy: "newest" })
  const { listings: featuredListings } = useListings({ sortBy: "popularity" })
  const { listings: auctions } = useListings({ type: "auction", sortBy: "newest" })
  return (
    <div>
      <section className="container-main pt-4 pb-0">
        <div className="relative bg-gradient-to-br from-white via-orange-50/20 to-white rounded-2xl border border-gray-200/80 shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <img src="/desert.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            <div className="lg:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-center text-end">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)] mb-3 w-fit ms-auto">
                <Store size={14} />
                {t("home.hero.subtitle")}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1.5 leading-tight">
                {t("app.name")}
              </h1>
              <p className="text-sm md:text-base text-gray-500 mb-4 leading-relaxed">
                {t("home.hero.description")}
              </p>
              <div className="flex flex-wrap gap-3 mb-4 justify-end">
                <Link href="/listings/new">
                  <Button size="lg" className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-md shadow-orange-200/50 rounded-xl font-semibold">
                    <Plus size={18} />
                    {t("home.hero.sell")}
                  </Button>
                </Link>
                <Link href="/listings">
                  <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl shadow-sm">
                    {t("home.hero.cta")}
                    {dir === "rtl" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </Button>
                </Link>
              </div>
              <div className="relative mb-4">
                <form
                  onSubmit={(e) => { e.preventDefault(); const q = new FormData(e.currentTarget).get("hero-search") as string; if (q?.trim()) window.location.href = `/listings?search=${encodeURIComponent(q.trim())}` }}
                >
                  <div className="relative">
                    <Search size={16} className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400" />
                    <input
                      type="text"
                      name="hero-search"
                      defaultValue=""
                      placeholder={t("nav.search")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 ps-4 pe-9 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/15 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center gap-4 md:gap-5 flex-wrap justify-end">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <UserCheck size={14} className="text-[var(--primary)]" />
                  <span className="font-semibold text-gray-800">{t("home.trustUsers")}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Package size={14} className="text-[var(--primary)]" />
                  <span className="font-semibold text-gray-800">{t("home.trustListings")}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ShoppingBag size={14} className="text-[var(--primary)]" />
                  <span className="font-semibold text-gray-800">{t("home.trustSales")}</span>
                </div>
              </div>
            </div>

            <div className="lg:w-[55%] p-6 md:p-8 lg:p-10 relative flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-sm">
                {heroImages.map((item, i) => (
                  <div
                    key={item.label}
                    className={`relative overflow-hidden rounded-full bg-gray-100 border-2 border-white shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ${i === 1 || i === 2 ? "md:mt-10" : ""}`}
                  >
                    <img src={item.src} alt="" loading="lazy" className="w-full aspect-square object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-main py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{t("home.categories")}</h2>
          <Link href="/listings" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            {t("common.viewAll")}
            {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categoryImages.map((cat) => (
            <Link
              key={cat.label}
              href={`/listings?category=${cat.label.replace("category.", "")}`}
              className="group flex flex-col items-center gap-3 p-3 md:p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={cat.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">
                {t(cat.label)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {featuredListings.length > 0 && (
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="container-main">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-[var(--primary)]" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">{t("home.featured")}</h2>
              </div>
              <Link href="/listings?sortBy=popularity" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
                {t("common.viewAll")}
                {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredListings.slice(0, 4).map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-main py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Gavel size={20} className="text-[var(--primary)]" />
            <h2 className="text-lg md:text-xl font-bold text-gray-900">{t("home.auctions")}</h2>
          </div>
          <Link href="/auctions" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            {t("common.viewAll")}
            {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
        {auctions.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                  <Gavel size={40} className="text-orange-200" />
                </div>
                <CardContent className="p-3 text-center">
                  <p className="text-sm text-gray-500">{t("listing.noResults")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {auctions.slice(0, 4).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-main">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-[var(--primary)]" />
              <h2 className="text-lg md:text-xl font-bold text-gray-900">{t("home.topSellers")}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {topSellersMock.map((seller, i) => (
              <Card key={seller.name} hover className="overflow-hidden">
                <CardContent className="p-4 text-center">
                  <div className="relative mx-auto mb-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-orange-400 flex items-center justify-center text-white text-lg font-bold mx-auto shadow-sm">
                      {seller.avatar}
                    </div>
                    {i === 0 && (
                      <div className="absolute -top-1 -end-1">
                        <Crown size={16} className="text-yellow-500 drop-shadow-sm" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-0.5">{seller.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-1.5">
                    <SellerBadge badge={seller.badge} />
                    <SellerLabel badge={seller.badge} />
                  </div>
                  <p className="text-[11px] text-gray-400 mb-1.5">{seller.listings} {locale === "ar" ? "إعلان" : "listings"}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-amber-600">
                    <Star size={12} fill="currentColor" />
                    <span className="font-medium">{seller.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[var(--primary)]" />
            <h2 className="text-lg md:text-xl font-bold text-gray-900">{t("home.recent")}</h2>
          </div>
          <Link href="/listings" className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1 font-medium">
            {t("common.viewAll")}
            {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="aspect-[4/3] skeleton-shimmer" />
                <div className="p-3 space-y-2">
                  <div className="h-4 skeleton-shimmer rounded w-3/4" />
                  <div className="h-5 skeleton-shimmer rounded w-1/2" />
                  <div className="h-3 skeleton-shimmer rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : recentListings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingBag size={48} className="mx-auto mb-3 text-gray-300" />
            <p>{t("listing.noResults")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentListings.slice(0, 8).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
