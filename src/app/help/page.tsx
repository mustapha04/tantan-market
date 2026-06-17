"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { ChevronDown, MessageCircle, Search, AlertCircle, HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    category: "الحساب",
    question: "كيف أنشئ حساب جديد؟",
    answer: "يمكنك إنشاء حساب بالنقر على زر 'إنشاء حساب' وملء النموذج بمعلوماتك الشخصية. ستتلقى رابط تفعيل عبر البريد الإلكتروني.",
  },
  {
    category: "الحساب",
    question: "نسيت كلمة المرور، ماذا أفعل؟",
    answer: "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول وأدخل بريدك الإلكتروني. ستتلقى رابط إعادة تعيين كلمة المرور.",
  },
  {
    category: "الإعلانات",
    question: "كيف أنشر إعلان جديد؟",
    answer: "بعد تسجيل الدخول، انقر على زر 'أضف إعلان' واملأ التفاصيل، أضف صور للمنتج، ثم انقر 'نشر'.",
  },
  {
    category: "الإعلانات",
    question: "كم المدة التي يبقى فيها الإعلان مرئياً؟",
    answer: "الإعلانات تبقى مرئية لمدة 30 يوم من تاريخ النشر. يمكنك تجديد الإعلان أو حذفه في أي وقت.",
  },
  {
    category: "البيع والشراء",
    question: "هل المنصة توفر خدمة الدفع؟",
    answer: "المنصة توفر خيارات للتواصل بين البائعين والمشترين. المعاملات تتم مباشرة بينكم. نوصي باستخدام طرق دفع آمنة.",
  },
  {
    category: "البيع والشراء",
    question: "ماذا لو حدثت مشكلة مع المنتج؟",
    answer: "يرجى التواصل مع البائع مباشرة عبر المحادثة لحل المشكلة. إذا لم يتمكن من حلها، يمكنك الإبلاغ عنها للدعم.",
  },
  {
    category: "الأمان",
    question: "هل بيانات حسابي آمنة؟",
    answer: "نعم، نستخدم تشفير SSL وأمان متقدم لحماية بيانات حسابك. لا تشارك كلمة المرور مع أحد.",
  },
  {
    category: "الأمان",
    question: "كيف أتجنب الاحتيال؟",
    answer: "تجنب تحويل الأموال قبل التأكد من المنتج والبائع. قابل المشتري في مكان آمن. تحقق من سمعة البائع.",
  },
  {
    category: "المحادثات",
    question: "كيف أتواصل مع البائع أو المشتري؟",
    answer: "انقر على زر 'المحادثة' على الإعلان لبدء محادثة مع البائع. يمكنك إرسال الرسائل والصور.",
  },
]

export default function HelpPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["الكل", ...new Set(faqItems.map((item) => item.category))]

  const filteredItems = faqItems.filter((item) => {
    const matchesCategory = selectedCategory === "الكل" || item.category === selectedCategory
    const matchesSearch = item.question.includes(searchQuery) || item.answer.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--primary)]/10 to-white py-12 md:py-16 border-b border-gray-200">
        <div className="container-main text-end">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">مركز المساعدة</h1>
          <p className="text-lg text-gray-600">
            هنا ستجد الإجابات على أكثر الأسئلة شيوعاً. إذا لم تجد ما تبحث عنه، تواصل معنا.
          </p>
        </div>
      </div>

      <div className="container-main py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث عن سؤالك..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 ps-10 pe-4 py-3 text-base focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/15 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredItems.map((item, index) => (
            <Card
              key={index}
              hover
              className="overflow-hidden"
              onClick={() => setExpandedId(expandedId === index ? null : index)}
            >
              <CardContent className="p-6 cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 text-end">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.question}
                    </h3>
                    <span className="inline-block text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      expandedId === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedId === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-600">لم نجد نتائج تطابق بحثك. حاول بكلمات أخرى.</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-gray-200">
          <div className="bg-[var(--primary)]/5 rounded-2xl p-8 text-end">
            <div className="flex items-start justify-end gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">لم تجد الإجابة؟</h3>
                <p className="text-gray-600 mb-6">
                  فريقنا هنا للمساعدة. تواصل معنا عبر أحد القنوات التالية:
                </p>
              </div>
              <MessageCircle size={32} className="text-[var(--primary)] flex-shrink-0 mt-1" />
            </div>

            <div className="space-y-3">
              <a
                href="mailto:support@tantanmarket.ma"
                className="flex items-center justify-end gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-end">
                  <p className="font-medium text-gray-900">البريد الإلكتروني</p>
                  <p className="text-sm text-gray-500">support@tantanmarket.ma</p>
                </div>
              </a>

              <a
                href="https://wa.me/212628000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-end gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-end">
                  <p className="font-medium text-gray-900">واتساب</p>
                  <p className="text-sm text-gray-500">+212 6 28 00 00 00</p>
                </div>
              </a>

              <a
                href="tel:+212628000000"
                className="flex items-center justify-end gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-end">
                  <p className="font-medium text-gray-900">الهاتف</p>
                  <p className="text-sm text-gray-500">+212 6 28 00 00 00</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
