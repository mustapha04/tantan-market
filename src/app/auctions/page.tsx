"use client"

import { useI18n } from "@/lib/i18n"
import { useListings } from "@/hooks/useListings"
import { ListingCard } from "@/components/listings/ListingCard"
import { Gavel } from "lucide-react"

export default function AuctionsPage() {
  const { t } = useI18n()
  const { listings, loading } = useListings({ type: "auction", sortBy: "newest" })

  return (
    <div className="container-main py-6">
      <div className="flex items-center gap-2 mb-6">
        <Gavel size={24} className="text-amber-600" />
        <h1 className="text-2xl font-bold">{t("nav.auctions")}</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16">
          <Gavel size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-1">{t("listing.noResults")}</h3>
          <p className="text-gray-500 text-sm">{t("listing.noResultsDesc")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
