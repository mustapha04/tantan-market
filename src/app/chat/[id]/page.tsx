"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChatDetailPage() {
  const { t, dir } = useI18n()
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [conversation, setConversation] = useState<any>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) { router.push("/login"); return }

    async function fetchConversation() {
      const { data: conv } = await supabase
        .from("conversations")
        .select("*, listing:listings(id, title_ar, title_fr, title_en, price)")
        .eq("id", id)
        .single()
      setConversation(conv)

      const { data: msgs } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true })

      setMessages(msgs || [])
      setLoading(false)
    }
    fetchConversation()

    const channel = supabase
      .channel(`chat-${id}`)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` },
        (payload: any) => {
          setMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id, user])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !conversation) return

    const receiverId = conversation.buyer_id === user.id ? conversation.seller_id : conversation.buyer_id

    await supabase.from("messages").insert({
      conversation_id: id,
      sender_id: user.id,
      receiver_id: receiverId,
      listing_id: conversation.listing_id,
      content: newMessage.trim(),
    })
    setNewMessage("")
  }

  if (!user) return null

  const otherUser = conversation?.buyer_id === user.id ? "البائع" : "المشتري"

  return (
    <div className="container-main py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link href="/chat" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-lg font-semibold">{otherUser}</h1>
          {conversation?.listing && (
            <p className="text-xs text-gray-500">
              {conversation.listing.title_ar || conversation.listing.title_fr || conversation.listing.title_en}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center text-gray-500 py-8">{t("common.loading")}</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">{t("chat.noMessages")}</div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender_id === user.id
              return (
                <div key={msg.id} className={`flex ${isMine ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      isMine
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${isMine ? "text-blue-200" : "text-gray-400"}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t p-3 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("chat.placeholder")}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <Button onClick={sendMessage} icon={<Send size={16} />} disabled={!newMessage.trim()}>
            {t("chat.send")}
          </Button>
        </div>
      </div>
    </div>
  )
}
