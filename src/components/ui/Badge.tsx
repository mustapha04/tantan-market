"use client"

import { cn } from "@/lib/utils/cn"
import type { ReactNode } from "react"

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "premium"

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[var(--muted)] text-[var(--foreground)]",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-[var(--primary)]/10 text-[var(--primary)]",
  premium: "bg-gradient-to-r from-[var(--accent)]/20 to-[var(--secondary)] text-[var(--foreground)]",
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  )
}
