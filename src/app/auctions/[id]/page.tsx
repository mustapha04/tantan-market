"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Gavel, Clock, Users, TrendingUp } from "lucide-react"
import { formatPrice } from "@/lib/utils/format"
import toast from "react-hot-toast"

export default function AuctionDetailPage() {
  const { t, locale } = useI18n()
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [listing, setListing] = useState<any>(null)
  const [bids, setBids] = useState<any[]>([])
  const [bidAmount, setBidAmount] = useState("")
  const [timeLeft, setTimeLeft] = useState("")
  const [loading, setLoading] = useState(true)
  const [bidding, setBidding] = useState(false)

  useEffect(() => {
    async function fetchAuction() {
      const { data } = await supabase
        .from("listings")
        .select("*, user:users(name, badge, avatar_url), images:listing_images(url)")
        .eq("id", id)
        .single()

      if (data) {
        setListing(data)
        setBidAmount(String(data.price))
      }

      const { data: bidData } = await supabase
        .from("bids")
        .select("*, user:users(name)")
        .eq("listing_id", id)
        .order("amount", { ascending: false })

      setBids(bidData || [])
      setLoading(false)
    }
    fetchAuction()

    const channel = supabase
      .channel(`auction-${id}`)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "bids", filter: `listing_id=eq.${id}` },
        (payload: any) => {
          setBids((prev) => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  useEffect(() => {
    if (!listing?.auction_end_time) return
    const update = () => {
      const diff = new Date(listing.auction_end_time).getTime() - Date.now()
      if (diff <= 0) { setTimeLeft(t("auction.title") + " " + t("common.loading")); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [listing?.auction_end_time])

  const placeBid = async () => {
    if (!user) { router.push("/login"); return }
    if (!bidAmount || isNaN(Number(bidAmount))) return
    setBidding(true)
    try {
      const { error } = await supabase.from("bids").insert({
        listing_id: id,
        user_id: user.id,
        amount: Number(bidAmount),
      })
      if (error) throw error
      await supabase.from("listings").update({ price: Number(bidAmount) }).eq("id", id)
      toast.success(t("common.success"))
    } catch {
      toast.error(t("common.error"))
    } finally {
      setBidding(false)
    }
  }

  if (loading) {
    return <div className="container-main py-8 text-center">{t("common.loading")}</div>
  }

  if (!listing) {
    return <div className="container-main py-8 text-center">{t("common.noData")}</div>
  }

  const currentBid = bids[0]?.amount || listing.price

  return (
    <div className="container-main py-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
              {listing.images?.[0] && (
                <img src={listing.images[0].url} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <Badge variant="warning" className="mb-3">
                  <Gavel size={14} className="ml-1" />
                  {t("listing.auction")}
                </Badge>

                <h1 className="text-xl font-bold mb-2">{listing.title_ar || listing.title}</h1>

                <div className="text-3xl font-bold text-amber-600 mb-4">
                  {formatPrice(currentBid)}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-center">
                    <p className="text-xs text-gray-500">{t("auction.startPrice")}</p>
                    <p className="font-bold">{formatPrice(listing.price)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center">
                    <p className="text-xs text-gray-500">{t("auction.currentBid")}</p>
                    <p className="font-bold text-blue-600">{formatPrice(currentBid)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-center">
                    <p className="text-xs text-gray-500">{t("auction.timeRemaining")}</p>
                    <p className="font-bold text-purple-600">{timeLeft}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-center">
                    <p className="text-xs text-gray-500">{t("auction.bidHistory")}</p>
                    <p className="font-bold text-green-600">{bids.length}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                    placeholder={t("auction.yourBid")}
                  />
                  <Button onClick={placeBid} loading={bidding} icon={<Gavel size={16} />}>
                    {t("auction.placeBid")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp size={16} />
                  {t("auction.bidHistory")} ({bids.length})
                </h3>
                {bids.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">{t("auction.noBids")}</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {bids.map((bid, i) => (
                      <div key={bid.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {bid.user?.name?.charAt(0) || "?"}
                          </div>
                          <span className="text-sm">{bid.user?.name || "مستخدم"}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-amber-600">{formatPrice(bid.amount)}</p>
                          <p className="text-xs text-gray-400">{new Date(bid.created_at).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
