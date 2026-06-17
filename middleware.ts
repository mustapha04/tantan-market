import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const protectedPaths = ["/dashboard", "/chat", "/listings/add", "/admin", "/profile"]
const authPaths = ["/login", "/register"]
const verifyPage = "/verify-email"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value }) => supabaseResponse.cookies.set(name, value))
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))
  const isAuthPage = authPaths.includes(pathname)
  const isVerifyPage = pathname === verifyPage

  if (user && !user.email_confirmed_at) {
    if (isProtected) {
      return NextResponse.redirect(new URL(verifyPage, request.url))
    }
  }

  if (user && user.email_confirmed_at) {
    if (isVerifyPage) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
