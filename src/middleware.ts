import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (hasLocale) return NextResponse.next()

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico|.*\\..*).*)'],
}
