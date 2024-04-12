import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = req.cookies.get('token')
  const { pathname } = req.nextUrl

  if (session) {
    if (pathname === '/')
      return NextResponse.redirect(new URL('/home', req.url))
  } else {
    if (
      pathname.startsWith('/home') ||
      pathname.startsWith('/calendar') ||
      pathname.startsWith('/profile') ||
      pathname.startsWith('/settings')
    )
      return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/:path*'],
}
