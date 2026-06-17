import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "سوق طانطان - TanTan Market",
  description: "سوق محلي للبيع والشراء في مدينة طانطان",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
