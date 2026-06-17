"use client"

import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { ListingCard } from "@/components/listings/ListingCard"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Shield, Award, Star, Medal, Package, Phone, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { t, locale } = useI18n()
  const { id } = useParams()
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single()

      const { data: listingData } = await supabase
        .from("listings")
        .select("*, images:listing_images(url)")
        .eq("user_id", id)
        .eq("status", "active")
        .order("created_at", { ascending: false })

      setProfile(userData)
      setListings(listingData || [])
      setLoading(false)
    }
    fetchProfile()
  }, [id])

  if (loading) return <div className="container-main py-8 text-center">{t("common.loading")}</div>
  if (!profile) return <div className="container-main py-8 text-center">{t("common.noData")}</div>

  const badgeConfig: Record<string, { label: string; icon: any; variant: any }> = {
    new: { label: t("dashboard.newSeller"), icon: Medal, variant: "default" },
    trusted: { label: t("dashboard.trustedSeller"), icon: Shield, variant: "info" },
    top: { label: t("dashboard.topSeller"), icon: Award, variant: "success" },
    verified: { label: t("dashboard.verifiedStore"), icon: Star, variant: "premium" },
  }

  const badge = badgeConfig[profile.badge] || badgeConfig.new

  return (
    <div className="container-main py-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {profile.name?.charAt(0) || "U"}
              </div>
              <div>
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {profile.badge && (
                    <Badge variant={badge.variant}>
                      <badge.icon size={12} className="ml-1" />
                      {badge.label}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {t("listing.memberSince")} {new Date(profile.created_at).getFullYear()}
                  </span>
                </div>
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-2">
                    <Phone size={14} />
                    {profile.phone}
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Package size={18} />
          {t("dashboard.listings")} ({listings.length})
        </h2>

        {listings.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t("common.noData")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
