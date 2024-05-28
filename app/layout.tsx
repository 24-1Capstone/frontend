import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { QueryProvider } from '@/components/query-provider'

const fontSans = GeistSans

export const metadata: Metadata = {
  title: 'ChatHub',
  description: 'ChatHub is a chat application for developers',
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
        <QueryProvider>
          <div className="relative mx-auto flex min-h-screen max-w-screen-sm flex-col bg-background">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
