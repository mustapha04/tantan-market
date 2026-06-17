"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Plus, Package, Eye, MessageCircle, Heart,
  TrendingUp, Medal, Star, Shield, Award,
  BarChart3, Settings, LogOut, User, Store
} from "lucide-react"

type DashboardStats = {
  totalListings: number
  activeListings: number
  soldListings: number
  totalViews: number
  totalMessages: number
  totalFavorites: number
  revenue: number
  credits: number
}

export default function DashboardPage() {
  const { t, locale } = useI18n()
  const { user, profile, logout } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0, activeListings: 0, soldListings: 0,
    totalViews: 0, totalMessages: 0, totalFavorites: 0,
    revenue: 0, credits: 0,
  })
  const [recentListings, setRecentListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { router.push("/login"); return }
    const uid = user.id

    async function fetchDashboard() {
      const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })

      const { data: credits } = await supabase
        .from("credits")
        .select("amount")
        .eq("user_id", uid)
        .single()

      if (listings) {
        const active = listings.filter((l: any) => l.status === "active")
        const sold = listings.filter((l: any) => l.status === "sold")
        const totalViews = listings.reduce((sum: number, l: any) => sum + (l.views || 0), 0)
        const revenue = sold.reduce((sum: number, l: any) => sum + (l.price || 0), 0)

        setStats({
          totalListings: listings.length,
          activeListings: active.length,
          soldListings: sold.length,
          totalViews,
          totalMessages: 0,
          totalFavorites: 0,
          revenue,
          credits: credits?.amount || 0,
        })
        setRecentListings(listings.slice(0, 5))
      }
      setLoading(false)
    }
    fetchDashboard()
  }, [user])

  if (!user) return null

  const badgeConfig = {
    new: { label: t("dashboard.newSeller"), icon: Medal, color: "text-gray-500", variant: "default" as const },
    trusted: { label: t("dashboard.trustedSeller"), icon: Shield, color: "text-blue-500", variant: "info" as const },
    top: { label: t("dashboard.topSeller"), icon: Award, color: "text-amber-500", variant: "success" as const },
    verified: { label: t("dashboard.verifiedStore"), icon: Star, color: "text-purple-500", variant: "premium" as const },
  }

  const currentBadge = badgeConfig[profile?.badge || "new"]

  const statCards = [
    { label: t("dashboard.totalListings"), value: stats.totalListings, icon: Package, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
    { label: t("dashboard.activeListings"), value: stats.activeListings, icon: TrendingUp, color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
    { label: t("dashboard.soldListings"), value: stats.soldListings, icon: Store, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
    { label: t("dashboard.totalViews"), value: stats.totalViews, icon: Eye, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
  ]

  return (
    <div className="container-main py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
          <p className="text-sm text-gray-500">{t("dashboard.overview")}</p>
        </div>
        <Link href="/listings/new">
          <Button icon={<Plus size={16} />}>{t("nav.sell")}</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <Card key={card.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${card.color}`}>
                      <card.icon size={18} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-gray-500">{card.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">{t("dashboard.listings")}</h2>
                <Link href="/listings" className="text-sm text-blue-600 hover:underline">{t("common.viewAll")}</Link>
              </div>
              {recentListings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package size={40} className="mx-auto mb-2 opacity-50" />
                  <p>{t("common.noData")}</p>
                  <Link href="/listings/new">
                    <Button variant="outline" size="sm" className="mt-3" icon={<Plus size={14} />}>
                      {t("listing.add")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentListings.map((listing: any) => (
                    <Link
                      key={listing.id}
                      href={`/listings/${listing.id}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-600 overflow-hidden shrink-0">
                          {listing.images?.[0] && (
                            <img src={listing.images[0]} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{listing.title_ar || listing.title}</p>
                          <p className="text-sm text-blue-600 font-semibold">{listing.price} MAD</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={listing.status === "active" ? "success" : listing.status === "sold" ? "default" : "warning"}>
                          {t(`listing.${listing.status}`)}
                        </Badge>
                        <Eye size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-400">{listing.views || 0}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {profile?.name?.charAt(0) || "U"}
              </div>
              <h3 className="font-semibold">{profile?.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{user.email}</p>
              <div className="inline-flex items-center gap-1">
                <currentBadge.icon size={14} className={currentBadge.color} />
                <Badge variant={currentBadge.variant}>{currentBadge.label}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">{t("dashboard.credits")}</h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.credits}</p>
                <p className="text-xs text-gray-500">{t("dashboard.creditsRemaining")}</p>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  {t("dashboard.freeListings")}: {Math.max(0, 10 - stats.totalListings)}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {t("dashboard.buyCredits")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3">{t("dashboard.revenue")}</h3>
              <p className="text-2xl font-bold text-green-600">{stats.revenue.toLocaleString()} MAD</p>
              <p className="text-xs text-gray-500">{t("dashboard.revenue")}</p>
            </CardContent>
          </Card>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 p-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm cursor-pointer"
          >
            <LogOut size={16} />
            {t("nav.logout")}
          </button>
        </div>
      </div>
    </div>
  )
}
