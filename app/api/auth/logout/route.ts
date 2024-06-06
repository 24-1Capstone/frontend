import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/'

  const response = NextResponse.redirect(url)
  response.cookies.delete('refresh_token')
  response.cookies.delete('token')

  return response
}
