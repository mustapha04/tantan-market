"use client"

import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react"

export default function ChatListPage() {
  const { t, dir } = useI18n()
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { router.push("/login"); return }
    const uid = user.id

    async function fetchConversations() {
      const { data } = await supabase
        .from("conversations")
        .select(`
          *,
          listing:listings(title_ar, title_fr, title_en, price, images:listing_images(url)),
          buyer:users!buyer_id(name),
          seller:users!seller_id(name),
          last_message:messages(content, created_at, sender_id)
        `)
        .or(`buyer_id.eq.${uid},seller_id.eq.${uid}`)
        .order("created_at", { ascending: false })

      setConversations(data || [])
      setLoading(false)
    }
    fetchConversations()
  }, [user])

  if (!user) return null

  return (
    <div className="container-main py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("chat.title")}</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-3 p-4 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="font-semibold mb-1">{t("chat.noConversations")}</h3>
          <p className="text-sm text-gray-500">{t("chat.startConversation")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv: any) => {
            const otherUser = conv.buyer_id === user.id ? conv.seller : conv.buyer
            const listingTitle = conv.listing?.title_ar || conv.listing?.title_fr || conv.listing?.title_en || ""
            return (
              <Link
                key={conv.id}
                href={`/chat/${conv.id}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                  {otherUser?.name?.charAt(0) || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{otherUser?.name}</p>
                    <span className="text-xs text-gray-400">
                      {conv.last_message && new Date(conv.last_message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{listingTitle}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conv.last_message?.content || ""}
                  </p>
                </div>
                {dir === "rtl" ? <ArrowLeft size={16} className="text-gray-400 shrink-0" /> : <ArrowRight size={16} className="text-gray-400 shrink-0" />}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
