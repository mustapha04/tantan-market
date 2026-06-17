export function formatPrice(price: number, currency = "MAD"): string {
  return new Intl.NumberFormat("ar-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string | Date, locale = "ar"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function timeAgo(date: string | Date, locale = "ar"): string {
  const now = new Date()
  const d = new Date(date)
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return locale === "ar" ? "الآن" : locale === "fr" ? "à l'instant" : "just now"
  if (mins < 60) return locale === "ar" ? `منذ ${mins} دقيقة` : locale === "fr" ? `il y a ${mins} min` : `${mins}m ago`
  if (hours < 24) return locale === "ar" ? `منذ ${hours} ساعة` : locale === "fr" ? `il y a ${hours}h` : `${hours}h ago`
  if (days < 7) return locale === "ar" ? `منذ ${days} يوم` : locale === "fr" ? `il y a ${days}j` : `${days}d ago`
  return formatDate(date, locale)
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len) + "..."
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
