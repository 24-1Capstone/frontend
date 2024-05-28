import { MeetingProvider } from '@/app/(chime)/provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MeetingProvider>{children}</MeetingProvider>
}
