import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl
  const session = req.cookies.has('token')
  const refreshToken = req.cookies.get('refresh_token')

  if (refreshToken && !session && pathname !== '/api/auth/login') {
    return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    }).then(async (res) => {
      const data = await res.json()

      const response =
        pathname === '/'
          ? NextResponse.redirect(new URL('/users', req.url))
          : NextResponse.next()
      response.cookies.set('token', data.accessToken, {
        maxAge: 3600,
        path: '/',
      })

      return response
    })
  }

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
