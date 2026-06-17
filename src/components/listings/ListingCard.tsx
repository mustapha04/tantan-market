"use client"

import type { Listing } from "@/hooks/useListings"
import { useI18n } from "@/lib/i18n"
import { formatPrice, timeAgo, truncate } from "@/lib/utils/format"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Link from "next/link"
import { Heart, Eye, MapPin, Clock, Gavel } from "lucide-react"
import { useState } from "react"

interface ListingCardProps {
  listing: Listing
  featured?: boolean
}

export function ListingCard({ listing, featured }: ListingCardProps) {
  const { t, locale } = useI18n()
  const [imgError, setImgError] = useState(false)
  const mainImage = listing.images?.[0]?.url

  const title = (listing as any)[`title_${locale}`] || listing.title
  const location = listing.location

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card hover className="group overflow-hidden h-full">
        <div className="aspect-[4/3] relative overflow-hidden bg-[var(--muted)]">
          {mainImage && !imgError ? (
            <img
              src={mainImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--muted-foreground)]">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-2 start-2 end-2 flex justify-between items-start">
            <div className="flex flex-wrap gap-1">
              {listing.type === "auction" && (
                <Badge variant="warning">
                  <Gavel size={10} className="inline me-1" />
                  {t("listing.auction")}
                </Badge>
              )}
              {featured && (
                <Badge variant="premium">مميز</Badge>
              )}
              {listing.condition === "new" && (
                <Badge variant="success">{t("listing.new")}</Badge>
              )}
            </div>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
              className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <Heart size={16} className="text-gray-600" />
            </button>
          </div>
          {listing.images && listing.images.length > 1 && (
            <div className="absolute bottom-2 end-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
              +{listing.images.length - 1}
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2">
            {truncate(title, 50)}
          </h3>
          <p className="text-lg font-bold text-[var(--primary)] mb-1">
            {formatPrice(listing.price)}
          </p>
          <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {timeAgo(listing.created_at, locale)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {listing.views || 0}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
