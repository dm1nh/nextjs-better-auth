import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import { routing } from "./i18n/routing"
import { getServerSession } from "./lib/auth/server"

const handleI18nRouting = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request)

  const { pathname } = request.nextUrl

  if (/^\/(en|vi)\/(dashboard|admin)/.test(pathname)) {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  return response
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/", "/(en|vi)/:path*"],
}
