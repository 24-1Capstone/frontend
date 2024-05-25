import { Bottom, Main, Top } from '@/components/layout'
import { TopAppBar } from '@/components/layout/top-app-bar'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Top>
        <TopAppBar />
      </Top>
      <Main className="p-4">{children}</Main>
      <Bottom>
        <BottomTabBar />
      </Bottom>
    </>
  )
}
