"use client"

import { useI18n, categories, neighborhoods, neighborhoodsFr, neighborhoodsEn } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { useAuth } from "@/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, Gavel, Tag } from "lucide-react"
import toast from "react-hot-toast"
import type { Locale } from "@/lib/i18n/translations"

export default function NewListingPage() {
  const { t, locale } = useI18n()
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState({ ar: "", fr: "", en: "" })
  const [description, setDescription] = useState({ ar: "", fr: "", en: "" })
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [condition, setCondition] = useState<"new" | "used">("used")
  const [type, setType] = useState<"fixed" | "auction">("fixed")
  const [whatsapp, setWhatsapp] = useState("")
  const [phone, setPhone] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const locationOptions = locale === "ar" ? neighborhoods : locale === "fr" ? neighborhoodsFr : neighborhoodsEn
  const locationLabels = locationOptions.map((n) => ({ value: n, label: n }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = 4 - images.length
    const selected = files.slice(0, remaining)
    setImages((prev) => [...prev, ...selected])
    selected.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const result = ev.target?.result
        if (result) setImagePreviews((prev) => [...prev, result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) { router.push("/login"); return }
    if (!title.ar.trim()) { toast.error(t("listing.title") + " " + t("common.error")); return }
    if (!price) { toast.error(t("listing.price") + " " + t("common.error")); return }
    if (imagePreviews.length === 0) { toast.error(t("listing.imagesRequired")); return }

    setSubmitting(true)
    let createdListingId: string | null = null
    try {
      // Ensure user profile exists in the public users table
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle()
      if (!existingProfile) {
        const { error: profileError } = await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
          phone: "",
          role: "user",
          badge: "new",
        })
        if (profileError) throw profileError
      }

      const { data: listing, error } = await supabase
        .from("listings")
        .insert({
          title_ar: title.ar,
          title_fr: title.fr || title.ar,
          title_en: title.en || title.ar,
          description_ar: description.ar,
          description_fr: description.fr || description.ar,
          description_en: description.en || description.ar,
          price: Number(price),
          category,
          location,
          condition,
          type,
          whatsapp,
          phone,
          user_id: user.id,
          status: "active",
        })
        .select()
        .single()

      if (error) throw error
      createdListingId = listing.id

      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const ext = file.name.split(".").pop()
        const path = `${user.id}/${listing.id}/${i}.${ext}`
        const { error: uploadError } = await supabase.storage.from("listings").upload(path, file)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from("listings").getPublicUrl(path)
        const { error: imgError } = await supabase.from("listing_images").insert({
          listing_id: listing.id,
          url: publicUrl,
        })
        if (imgError) throw imgError
      }

      toast.success(t("common.success"))
      router.push(`/listings/${listing.id}`)
    } catch (err: any) {
      console.error("Listing creation error:", err?.message || err?.error?.message || JSON.stringify(err))
      if (createdListingId) {
        await supabase.from("listings").delete().eq("id", createdListingId)
      }
      toast.error(t("common.error"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-main py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("listing.add")}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.title")}</h2>
          <Input id="title-ar" label="العربية" value={title.ar} onChange={(e) => setTitle({ ...title, ar: e.target.value })} required />
          <Input id="title-fr" label="Français" value={title.fr} onChange={(e) => setTitle({ ...title, fr: e.target.value })} />
          <Input id="title-en" label="English" value={title.en} onChange={(e) => setTitle({ ...title, en: e.target.value })} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.description")}</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">العربية</label>
            <textarea
              value={description.ar}
              onChange={(e) => setDescription({ ...description, ar: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Français</label>
            <textarea
              value={description.fr}
              onChange={(e) => setDescription({ ...description, fr: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">English</label>
            <textarea
              value={description.en}
              onChange={(e) => setDescription({ ...description, en: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.price")}</h2>
          <div className="relative">
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
              className="pr-16"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">MAD</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.type")}</h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setType("fixed")}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                type === "fixed"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
              }`}
            >
              <Tag size={20} />
              <span className="font-medium text-sm">{t("listing.fixedPrice")}</span>
            </button>
            <button
              type="button"
              onClick={() => setType("auction")}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                type === "auction"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
              }`}
            >
              <Gavel size={20} />
              <span className="font-medium text-sm">{t("listing.auction")}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.condition")}</h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCondition("new")}
              className={`flex-1 p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                condition === "new"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            >
              <span className="font-medium text-sm">{t("listing.new")}</span>
            </button>
            <button
              type="button"
              onClick={() => setCondition("used")}
              className={`flex-1 p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                condition === "used"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            >
              <span className="font-medium text-sm">{t("listing.used")}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.category")}</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">{t("filter.all")}</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.icon} {t(`category.${cat.key}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.location")}</h2>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">{t("filter.location")}</option>
            {locationOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.images")}</h2>
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <label
                key={i}
                className={`aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors relative overflow-hidden ${
                  imagePreviews[i] ? "" : ""
                }`}
              >
                {imagePreviews[i] ? (
                  <>
                    <img src={imagePreviews[i]} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <Upload size={24} className="text-gray-400" />
                )}
                {!imagePreviews[i] && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                )}
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500">{t("listing.maxImages")}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold">{t("listing.phone")}</h2>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" />
          <Input id="whatsapp" label="WhatsApp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} dir="ltr" />
        </div>

        <Button type="submit" loading={submitting} className="w-full" size="lg">
          {t("listing.submit")}
        </Button>
      </form>
    </div>
  )
}
