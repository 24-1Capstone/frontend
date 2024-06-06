import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect('https://www.coffeechat.shop')
  response.cookies.delete('refresh_token')
  response.cookies.delete('token')

  return response
}
