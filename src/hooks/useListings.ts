"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Locale } from "@/lib/i18n/translations"

export type Listing = {
  id: string
  title: string
  title_ar: string
  title_fr: string
  title_en: string
  description: string
  description_ar: string
  description_fr: string
  description_en: string
  price: number
  category: string
  location: string
  status: "active" | "sold" | "hidden"
  type: "fixed" | "auction"
  condition: "new" | "used"
  whatsapp: string
  phone: string
  views: number
  is_featured: boolean
  is_boosted: boolean
  user_id: string
  created_at: string
  user?: {
    id: string
    name: string
    phone: string
    badge: string
    avatar_url: string
  }
  images?: { id: string; url: string }[]
  _count?: { messages: number }
}

type Filters = {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  sortBy?: "newest" | "oldest" | "price_low" | "price_high" | "popularity"
  type?: "fixed" | "auction"
}

export function useListings(filters?: Filters) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const supabase = createClient()

  const fetchListings = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from("listings")
        .select(`
          *,
          user:users(id, name, phone, badge, avatar_url),
          images:listing_images(id, url)
        `, { count: "exact" })
        .eq("status", "active")

      if (filters?.search) {
        query = query.or(`title_ar.ilike.%${filters.search}%,title_fr.ilike.%${filters.search}%,title_en.ilike.%${filters.search}%`)
      }
      if (filters?.category) {
        query = query.eq("category", filters.category)
      }
      if (filters?.minPrice !== undefined) {
        query = query.gte("price", filters.minPrice)
      }
      if (filters?.maxPrice !== undefined) {
        query = query.lte("price", filters.maxPrice)
      }
      if (filters?.location) {
        query = query.eq("location", filters.location)
      }
      if (filters?.type) {
        query = query.eq("type", filters.type)
      }

      const sortMap: Record<string, { column: string; ascending: boolean }> = {
        newest: { column: "created_at", ascending: false },
        oldest: { column: "created_at", ascending: true },
        price_low: { column: "price", ascending: true },
        price_high: { column: "price", ascending: false },
        popularity: { column: "views", ascending: false },
      }
      const sort = sortMap[filters?.sortBy || "newest"]
      query = query.order(sort.column, { ascending: sort.ascending })

      const { data, count } = await query.limit(50)
      setListings((data || []) as unknown as Listing[])
      setTotal(count || 0)
    } catch (e) {
      console.error("Error fetching listings:", e)
    } finally {
      setLoading(false)
    }
  }, [filters?.search, filters?.category, filters?.minPrice, filters?.maxPrice, filters?.location, filters?.sortBy, filters?.type])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  return { listings, loading, total, refetch: fetchListings }
}
