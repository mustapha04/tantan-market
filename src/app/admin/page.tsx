"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Users, Package, LayoutDashboard, CreditCard, AlertTriangle, Search, Plus, X } from "lucide-react"
import toast from "react-hot-toast"

type Tab = "users" | "listings" | "credits" | "reports"

export default function AdminPage() {
  const { t } = useI18n()
  const { user, profile } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [tab, setTab] = useState<Tab>("users")
  const [users, setUsers] = useState<any[]>([])
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [creditModal, setCreditModal] = useState<{ open: boolean; userId: string; userName: string }>({ open: false, userId: "", userName: "" })
  const [creditAmount, setCreditAmount] = useState("")

  useEffect(() => {
    if (!user || profile?.role !== "admin") { router.push("/"); return }
    fetchData()
  }, [user, profile])

  async function fetchData() {
    setLoading(true)
    const [usersRes, listingsRes] = await Promise.all([
      supabase.from("users").select("*").order("created_at", { ascending: false }),
      supabase.from("listings").select("*, user:users(name)").order("created_at", { ascending: false }),
    ])
    if (usersRes.data) setUsers(usersRes.data)
    if (listingsRes.data) setListings(listingsRes.data)
    setLoading(false)
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "users", label: t("admin.users"), icon: Users },
    { key: "listings", label: t("admin.listings"), icon: Package },
    { key: "credits", label: t("admin.credits"), icon: CreditCard },
    { key: "reports", label: t("admin.reports"), icon: AlertTriangle },
  ]

  const handleAddCredits = async () => {
    if (!creditAmount || isNaN(Number(creditAmount))) return
    try {
      const { data: existing } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", creditModal.userId)
        .single()

      if (existing) {
        await supabase
          .from("credits")
          .update({ amount: existing.amount + Number(creditAmount) })
          .eq("user_id", creditModal.userId)
      } else {
        await supabase
          .from("credits")
          .insert({ user_id: creditModal.userId, amount: Number(creditAmount) })
      }

      toast.success(t("common.success"))
      setCreditModal({ open: false, userId: "", userName: "" })
      setCreditAmount("")
      fetchData()
    } catch {
      toast.error(t("common.error"))
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (!confirm(t("common.confirm"))) return
    await supabase.from("listings").delete().eq("id", id)
    toast.success(t("common.success"))
    fetchData()
  }

  const handleBanUser = async (userId: string) => {
    if (!confirm(t("common.confirm"))) return
    await supabase.from("users").update({ role: "banned" }).eq("id", userId)
    toast.success(t("common.success"))
    fetchData()
  }

  return (
    <div className="container-main py-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard size={24} className="text-blue-600" />
        <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              tab === t.key
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <Input
                placeholder={t("common.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={16} />}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-right p-3 font-medium">{t("auth.name")}</th>
                    <th className="text-right p-3 font-medium">{t("auth.email")}</th>
                    <th className="text-right p-3 font-medium">{t("auth.phone")}</th>
                    <th className="text-right p-3 font-medium">{t("dashboard.badge")}</th>
                    <th className="text-right p-3 font-medium">{t("admin.credits")}</th>
                    <th className="text-right p-3 font-medium">{t("common.menu")}</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) => u.name?.includes(searchTerm) || u.email?.includes(searchTerm))
                    .map((u) => (
                      <tr key={u.id} className="border-t dark:border-gray-700">
                        <td className="p-3">{u.name}</td>
                        <td className="p-3 text-gray-500">{u.email}</td>
                        <td className="p-3">{u.phone}</td>
                        <td className="p-3"><Badge>{u.badge}</Badge></td>
                        <td className="p-3">
                          <button
                            onClick={() => setCreditModal({ open: true, userId: u.id, userName: u.name })}
                            className="text-blue-600 hover:underline text-xs cursor-pointer"
                          >
                            + {t("admin.addCredits")}
                          </button>
                        </td>
                        <td className="p-3">
                          {u.role !== "admin" && (
                            <button onClick={() => handleBanUser(u.id)} className="text-red-600 hover:underline text-xs cursor-pointer">
                              {t("admin.ban")}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "listings" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-right p-3 font-medium">{t("listing.title")}</th>
                    <th className="text-right p-3 font-medium">{t("listing.seller")}</th>
                    <th className="text-right p-3 font-medium">{t("listing.price")}</th>
                    <th className="text-right p-3 font-medium">{t("listing.status")}</th>
                    <th className="text-right p-3 font-medium">{t("common.menu")}</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l.id} className="border-t dark:border-gray-700">
                      <td className="p-3">{l.title_ar || l.title}</td>
                      <td className="p-3 text-gray-500">{l.user?.name}</td>
                      <td className="p-3">{l.price} MAD</td>
                      <td className="p-3">
                        <Badge variant={l.status === "active" ? "success" : l.status === "sold" ? "default" : "warning"}>
                          {l.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <button onClick={() => handleDeleteListing(l.id)} className="text-red-600 hover:underline text-xs cursor-pointer">
                          {t("admin.delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "credits" && (
        <div className="space-y-4">
          {users.map((u) => (
            <Card key={u.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCreditModal({ open: true, userId: u.id, userName: u.name })}
                >
                  <Plus size={14} className="ml-1" />
                  {t("admin.addCredits")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {creditModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setCreditModal({ open: false, userId: "", userName: "" })} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-semibold mb-4">{t("admin.addCredits")} - {creditModal.userName}</h3>
            <Input
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              placeholder="0"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddCredits} className="flex-1">{t("common.confirm")}</Button>
              <Button variant="outline" className="flex-1" onClick={() => setCreditModal({ open: false, userId: "", userName: "" })}>
                {t("common.cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
