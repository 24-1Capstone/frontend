import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { NextAuthProvider } from '@/contexts/next-auth-provider'

const fontSans = GeistSans

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          'min-h-screen bg-black font-sans antialiased',
          fontSans.variable,
        )}
      >
        <NextAuthProvider>
          <div className="relative mx-auto flex min-h-screen max-w-screen-sm flex-col bg-background">
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}