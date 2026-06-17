"use client"

import Image from "next/image"
import { cn } from "@/lib/utils/cn"
import { useI18n } from "@/lib/i18n"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeMap = { sm: 36, md: 44, lg: 56, xl: 64 }
const textSizes = { sm: "text-base", md: "text-lg", lg: "text-xl", xl: "text-2xl" }

export function Logo({ className, showText = true, size = "lg" }: LogoProps) {
  const { locale } = useI18n()
  const dim = sizeMap[size]
  const isAr = locale === "ar"

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative shrink-0 transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="سوق طانطان"
          width={dim}
          height={dim}
          className="object-contain drop-shadow-sm"
          quality={100}
          priority
        />
      </div>
      {showText && isAr ? (
        <span className={cn("font-bold tracking-tight text-gray-900 whitespace-nowrap", textSizes[size])}>
          سوق طانطان
        </span>
      ) : showText ? (
        <div className="flex flex-col leading-tight">
          <span className={cn("font-bold tracking-tight text-gray-900 whitespace-nowrap", textSizes[size])}>
            Tan-Tan Market
          </span>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide">سوق طانطان</span>
        </div>
      ) : null}
    </div>
  )
}
