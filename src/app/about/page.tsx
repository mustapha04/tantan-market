"use client"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Shield, Users, Smile, Mail, MessageCircle, Target, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"

const values = [
  { key: "trust", icon: Shield },
  { key: "community", icon: Users },
  { key: "simplicity", icon: Smile },
]

const stats = [
  { key: "users", icon: Users },
  { key: "listings", icon: BarChart3 },
  { key: "sales", icon: Target },
  { key: "cities", icon: Eye },
]

export default function AboutPage() {
  const { t, locale } = useI18n()
  const isRtl = locale === "ar"

  return (
    <div className="container-main py-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">{t("nav.about")}</Badge>
          <h1 className="text-4xl font-bold mb-3">{t("about.title")}</h1>
          <p className="text-lg text-gray-500">{t("about.subtitle")}</p>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {t("about.description")}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  <Target size={20} />
                </div>
                <h2 className="text-lg font-semibold">{t("about.mission")}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("about.missionDesc")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                  <Eye size={20} />
                </div>
                <h2 className="text-lg font-semibold">{t("about.vision")}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t("about.visionDesc")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">{t("about.values")}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v) => (
              <Card key={v.key}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-4">
                    <v.icon size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">{t(`about.${v.key}`)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t(`about.${v.key}Desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <Card key={s.key}>
              <CardContent className="p-5 text-center">
                <div className="inline-flex p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 mb-3">
                  <s.icon size={20} />
                </div>
                <p className="text-xl font-bold">{t(`about.stats.${s.key}`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">{t("about.contact")}</h2>
            <p className="text-gray-500 mb-6">{t("about.contactDesc")}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="mailto:contact@tantanmarket.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Mail size={16} />
                {t("about.email")}
              </Link>
              <Link
                href="https://wa.me/212600000000"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <MessageCircle size={16} />
                {t("about.whatsapp")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
