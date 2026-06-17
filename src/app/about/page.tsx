"use client"

import { useI18n } from "@/lib/i18n"
import Link from "next/link"
import { MapPin, Users, Shield, Zap, Award, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function AboutPage() {
  const { t } = useI18n()

  const features = [
    {
      icon: <Shield size={24} className="text-[var(--primary)]" />,
      title: "الأمان والموثوقية",
      description: "نحن نضمن أمان معاملاتك مع التحقق من جميع البائعين والمشترين",
    },
    {
      icon: <Zap size={24} className="text-[var(--primary)]" />,
      title: "سهل وسريع",
      description: "منصة بسيطة وسريعة تجعل البيع والشراء أسهل من أي وقت مضى",
    },
    {
      icon: <Users size={24} className="text-[var(--primary)]" />,
      title: "مجتمع نشط",
      description: "انضم إلى آلاف المستخدمين الذين يثقون بنا يومياً",
    },
    {
      icon: <Award size={24} className="text-[var(--primary)]" />,
      title: "جودة عالية",
      description: "نحرص على جودة الخدمة والمنتجات المعروضة على منصتنا",
    },
  ]

  const stats = [
    { number: "50K+", label: "المستخدمين النشطين" },
    { number: "100K+", label: "الإعلانات المرفوعة" },
    { number: "25K+", label: "المعاملات الناجحة" },
    { number: "24/7", label: "الدعم الفني" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)]/10 via-white to-white py-16 md:py-24">
        <div className="container-main text-end">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            عن سوق طانطان
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl ms-auto">
            منصة تجارة إلكترونية محلية موثوقة تربط البائعين والمشترين في طانطان والمناطق المحيطة بها
          </p>
          <div className="flex gap-4 justify-end">
            <Link href="/listings">
              <Button variant="primary" size="lg" className="rounded-xl">
                تصفح الإعلانات
              </Button>
            </Link>
            <Link href="/listings/new">
              <Button variant="outline" size="lg" className="rounded-xl">
                اضف إعلانك الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container-main py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-end">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">رسالتنا</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            نؤمن بأن التجارة الإلكترونية يجب أن تكون في متناول الجميع. لذلك نعمل بجد لتوفير منصة آمنة وموثوقة وسهلة الاستخدام حيث يمكن للناس بيع وشراء ما يريدون بثقة تامة.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            هدفنا هو أن نصبح السوق المفضل لكل سكان طانطان والمناطق المحيطة بها، حيث يمكن إيجاد كل ما تحتاجه بسهولة وبأسعار منافسة.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">لماذا تختار سوق طانطان؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} hover className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 bg-[var(--primary)]/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-main py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">فريقنا</h2>
        <div className="max-w-2xl mx-auto text-center text-end">
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            <Heart className="inline-block ms-2 text-[var(--primary)]" size={20} />
            نحن فريق صغير لكن متفاني من مهندسي البرامج ورجال الأعمال المحليين الذين يؤمنون بقوة التجارة الإلكترونية المحلية.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            كل يوم نعمل على تحسين المنصة لتقديم أفضل تجربة للمستخدمين.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-[var(--primary)]/10 to-white py-16 md:py-24 border-t border-gray-200">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">تواصل معنا</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            هل لديك أسئلة أو اقتراحات؟ نحن هنا لمساعدتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:contact@tantanmarket.ma" className="inline-flex items-center justify-center gap-2">
              <Button variant="primary" className="rounded-xl">
                راسلنا عبر البريد
              </Button>
            </a>
            <a href="https://wa.me/212628000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
              <Button variant="outline" className="rounded-xl">
                تواصل عبر واتساب
              </Button>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin size={18} className="text-[var(--primary)]" />
            <span>طانطان، المغرب</span>
          </div>
        </div>
      </section>
    </div>
  )
}
