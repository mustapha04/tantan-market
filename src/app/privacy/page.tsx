"use client"

import { Card, CardContent } from "@/components/ui/Card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-main py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-end">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">سياسة الخصوصية</h1>
          <p className="text-gray-500 mb-8">آخر تحديث: يوليو 2024</p>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. مقدمة</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحن في سوق طانطان نحترم خصوصيتك. تصف هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لبيانات المستخدمين على منصتنا.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. البيانات التي نجمعها</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المعلومات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>معلومات الحساب: كلمة المرور (مشفرة)، تاريخ الإنشاء</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>معلومات الإعلانات: المنتجات المعروضة، الصور، الوصف</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>معلومات الاستخدام: طرق الوصول، صفحات المتصفح، الوقت</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. كيف نستخدم بيانات المستخدمين</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>توفير وتحسين الخدمات</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>إرسال التنبيهات والرسائل المتعلقة بالحساب</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>معالجة المعاملات والدفع</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>إرسال رسائل تسويقية (مع إمكانية الإلغاء)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>الامتثال للقوانين واللوائح</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. حماية البيانات</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  نستخدم إجراءات أمان متقدمة لحماية بيانات المستخدمين:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>تشفير SSL/TLS لجميع الاتصالات</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>كلمات مرور مشفرة باستخدام خوارزميات قوية</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>خوادم آمنة مع نسخ احتياطية منتظمة</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>فحوصات أمنية دورية</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. حقوق المستخدمين</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  يحق لك:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>الوصول إلى بيانات حسابك الشخصية</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>تصحيح أو تحديث بيانتك</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>طلب حذف حسابك والبيانات المرتبطة به</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>الاعتراض على معالجة بيانتك</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. التواصل</h2>
                <p className="text-gray-600 leading-relaxed">
                  إذا كان لديك أي استفسارات بشأن هذه السياسة أو ممارسات الخصوصية لدينا، يرجى التواصل معنا:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">البريد الإلكتروني: privacy@tantanmarket.ma</p>
                  <p className="text-gray-700">الهاتف: +212 6 28 00 00 00</p>
                  <p className="text-gray-700">العنوان: طانطان، المغرب</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
