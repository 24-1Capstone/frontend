import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = req.cookies.get('token')
  const { pathname } = req.nextUrl

  if (session) {
    if (pathname === '/')
      return NextResponse.redirect(new URL('/users', req.url))
  } else {
    if (
      pathname.startsWith('/users') ||
      pathname.startsWith('/my-chat') ||
      pathname.startsWith('/profile') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/meet') ||
      pathname.startsWith('/reserve')
    )
      return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/:path*'],
}
