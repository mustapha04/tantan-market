"use client"

import { useI18n, categories } from "@/lib/i18n"
import { useListings } from "@/hooks/useListings"
import { ListingCard } from "@/components/listings/ListingCard"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

function ListingsContent() {
  const { t, locale } = useI18n()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: (searchParams.get("sortBy") || "newest") as any,
  })
  const [showFilters, setShowFilters] = useState(false)

  const { listings, loading, total } = useListings({
    search: filters.search || undefined,
    category: filters.category || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sortBy: filters.sortBy,
  })

  const sortOptions = [
    { value: "newest", label: t("filter.newest") },
    { value: "oldest", label: t("filter.oldest") },
    { value: "price_low", label: t("filter.priceLow") },
    { value: "price_high", label: t("filter.priceHigh") },
    { value: "popularity", label: t("filter.popularity") },
  ]

  return (
    <div className="container-main py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("nav.listings")}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<SlidersHorizontal size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {t("common.filter")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {showFilters && (
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-4 space-y-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{t("common.filter")}</h3>
                <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("filter.search")}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder={t("nav.search")}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm dark:bg-gray-700 dark:border-gray-600"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("listing.category")}</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">{t("filter.all")}</option>
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.icon} {t(`category.${cat.key}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("filter.priceRange")}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder={t("filter.minPrice")}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder={t("filter.maxPrice")}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("filter.sortBy")}</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1">
          {total > 0 && (
            <p className="text-sm text-gray-500 mb-4">
              {total} {t("listing.title")}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-lg font-semibold mb-1">{t("listing.noResults")}</h3>
              <p className="text-gray-500 text-sm">{t("listing.noResultsDesc")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ListingsPage() {
  return (
    <Suspense>
      <ListingsContent />
    </Suspense>
  )
}
