"use client"

import { Card, CardContent } from "@/components/ui/Card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-main py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-end">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">شروط الخدمة</h1>
          <p className="text-gray-500 mb-8">آخر تحديث: يوليو 2024</p>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. قبول الشروط</h2>
                <p className="text-gray-600 leading-relaxed">
                  باستخدامك لمنصة سوق طانطان، فإنك توافق على الالتزام بجميع الشروط والأحكام الواردة في هذه السياسة. إذا كنت لا توافق على أي شرط من هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. حساب المستخدم</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>يجب أن تكون عمرك 18 سنة على الأقل لإنشاء حساب</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>أنت مسؤول عن سرية كلمة المرور الخاصة بك</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>يجب توفير معلومات دقيقة وصحيحة</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. سياسة الإعلانات</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>يجب أن تكون جميع الإعلانات قانونية وصادقة وغير مضللة</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>لا يسمح بنشر إعلانات تحتوي على محتوى غير لائق أو مسيء</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>نحتفظ بالحق في حذف أي إعلان ينتهك هذه الشروط</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>التصريح الكامل والمسؤولية عن محتوى الإعلان تقع على عاتق الناشر</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. المعاملات والدفع</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المنصة توفر خدمة الربط بين البائعين والمشترين</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المعاملات تتم مباشرة بين المستخدمين</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>نحن لا نتحمل مسؤولية عن جودة المنتجات أو الخدمات</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>يجب على المستخدمين الاتفاق على الأسعار والشروط بأنفسهم</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. المحتوى المحظور</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  يُحظر نشر الإعلانات أو المحتوى التالي:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المنتجات غير القانونية أو المسروقة</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المحتوى الفاسد أو غير الأخلاقي</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>الرسائل غير المرغوبة والاحتيال</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المضايقات والتحرش والكراهية</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>المعلومات الشخصية للآخرين دون إذن</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. استخدام المنصة</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>أنت توافق على عدم استخدام المنصة لأي غرض غير قانوني</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>لا تحاول الوصول بشكل غير مصرح إلى أنظمتنا</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>لا تستخدم أتمتة أو برامج آلية لكشط البيانات</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span>احترم حقوق الملكية الفكرية للآخرين</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. إنهاء الحساب</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحن نحتفظ بالحق في إنهاء أو تعليق حسابك في أي وقت إذا انتهكت هذه الشروط. يمكنك أيضاً طلب حذف حسابك في أي وقت.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. التنصل من المسؤولية</h2>
                <p className="text-gray-600 leading-relaxed">
                  المنصة توفر "كما هي". نحن لا نضمن عدم الأخطاء أو الانقطاعات. لا نتحمل مسؤولية عن أي أضرار مباشرة أو غير مباشرة ناشئة عن استخدام المنصة.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. تعديل الشروط</h2>
                <p className="text-gray-600 leading-relaxed">
                  نحن نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بأي تغييرات كبيرة.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
