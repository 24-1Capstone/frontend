import { MeetingProvider } from './provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MeetingProvider>{children}</MeetingProvider>
}
