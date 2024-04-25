import { NextRequest, NextResponse } from 'next/server'

import { getAccessToken } from '@/api/auth'

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')

  if (refreshToken) {
    const { data } = await getAccessToken(refreshToken.value)

    const url = request.nextUrl.clone()
    url.pathname = '/'

    const response = NextResponse.redirect(url)
    response.cookies.set('token', data.accessToken, {
      maxAge: 3600,
      path: '/',
    })

    return response
  }
}
