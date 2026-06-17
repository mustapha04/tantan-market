"use client"

import { useI18n, getCategoryLabel } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { formatPrice, timeAgo } from "@/lib/utils/format"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Heart, Share2, Flag, MapPin, Clock, Eye,
  MessageCircle, ChevronLeft, ChevronRight, Gavel, Phone, User, Shield, Store
} from "lucide-react"
import toast from "react-hot-toast"

export default function ListingDetailPage() {
  const { t, locale } = useI18n()
  const { id } = useParams()
  const router = useRouter()
  const { user, profile } = useAuth()
  const supabase = createClient()
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    async function fetchListing() {
      const { data } = await supabase
        .from("listings")
        .select(`
          *,
          user:users(id, name, phone, badge, avatar_url, created_at),
          images:listing_images(id, url)
        `)
        .eq("id", id)
        .single()

      if (data) {
        setListing(data)
        setIsOwner(data.user_id === user?.id)
        await supabase.rpc("increment_views", { listing_id: id })
      }
      setLoading(false)
    }
    fetchListing()
  }, [id, user])

  const handleChat = async () => {
    if (!user) { router.push("/login"); return }
    setChatLoading(true)
    try {
      const { data: existing } = await supabase
        .from("messages")
        .select("conversation_id")
        .eq("listing_id", id)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .limit(1)
        .maybeSingle()

      if (existing) {
        router.push(`/chat/${existing.conversation_id}`)
      } else {
        const { data: conv } = await supabase
          .from("conversations")
          .insert({ listing_id: id, buyer_id: user.id, seller_id: listing.user_id })
          .select()
          .single()

        if (conv) {
          await supabase.from("messages").insert({
            conversation_id: conv.id,
            sender_id: user.id,
            receiver_id: listing.user_id,
            listing_id: id,
            content: t("chat.startConversation"),
          })
          router.push(`/chat/${conv.id}`)
        }
      }
    } catch {
      toast.error(t("common.error"))
    } finally {
      setChatLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container-main py-8">
        <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container-main py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold mb-2">{t("listing.noResults")}</h2>
        <Button onClick={() => router.push("/listings")}>{t("common.back")}</Button>
      </div>
    )
  }

  const title = listing[`title_${locale}`] || listing.title
  const description = listing[`description_${locale}`] || listing.description
  const images = listing.images || []

  return (
    <div className="container-main py-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <div className="aspect-[16/10] relative">
                {images.length > 0 ? (
                  <img
                    src={images[currentImage]?.url}
                    alt={title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? "bg-white w-4" : "bg-white/60"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img: any, i: number) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === currentImage ? "border-blue-500" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="hidden lg:block">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(listing.price)}
                    </p>
                    {listing.type === "auction" && (
                      <p className="text-sm text-amber-600 flex items-center gap-1 mt-1">
                        <Gavel size={14} /> {t("auction.title")}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.type === "auction" && <Badge variant="warning">{t("listing.auction")}</Badge>}
                  {listing.condition === "new" ? <Badge variant="success">{t("listing.new")}</Badge> : <Badge>{t("listing.used")}</Badge>}
                  {listing.is_featured && <Badge variant="premium">مميز</Badge>}
                </div>

                <div className="space-y-2.5 text-sm mb-5">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} />
                    <span>{listing.location || t("filter.location")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span>{timeAgo(listing.created_at, locale)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Eye size={16} />
                    <span>{listing.views || 0} {t("listing.views")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Store size={16} />
                    <span>{getCategoryLabel(listing.category, locale)}</span>
                  </div>
                </div>

                {user && (
                  <div className="space-y-2">
                    {!isOwner && (
                      <>
                        <Button onClick={handleChat} loading={chatLoading} className="w-full" size="lg" icon={<MessageCircle size={18} />}>
                          {t("listing.contact")}
                        </Button>
                        {listing.whatsapp && (
                          <a
                            href={`https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(t("chat.startConversation"))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="success" className="w-full" size="lg" icon={<Phone size={18} />}>
                              WhatsApp
                            </Button>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                )}

                {!user && (
                  <Link href="/login">
                    <Button className="w-full" size="lg" icon={<MessageCircle size={18} />}>
                      {t("listing.contact")}
                    </Button>
                  </Link>
                )}

                {isOwner && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => router.push(`/listings/new?edit=${listing.id}`)}>
                      {t("listing.edit")}
                    </Button>
                    {listing.status === "active" && (
                      <Button variant="success" className="flex-1">
                        {t("listing.sold")}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User size={16} />
                  {t("listing.seller")}
                </h3>
                <Link href={`/profile/${listing.user_id}`} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {listing.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium">{listing.user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {t("listing.memberSince")} {new Date(listing.user?.created_at).getFullYear()}
                    </p>
                  </div>
                  {listing.user?.badge && (
                    <Badge variant={listing.user.badge === "verified" ? "premium" : listing.user.badge === "top" ? "success" : "info"}>
                      <Shield size={10} className="inline mr-1" />
                      {t(`dashboard.${listing.user.badge === "new" ? "newSeller" : listing.user.badge === "trusted" ? "trustedSeller" : listing.user.badge === "top" ? "topSeller" : "verifiedStore"}`)}
                    </Badge>
                  )}
                </Link>
                {listing.phone && (
                  <a href={`tel:${listing.phone}`} className="flex items-center gap-2 mt-3 text-sm text-blue-600 hover:underline">
                    <Phone size={14} />
                    {listing.phone}
                  </a>
                )}
              </CardContent>
            </Card>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
              <Flag size={14} />
              {t("listing.report")}
            </button>
          </div>
        </div>

        <div className="lg:hidden mt-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
