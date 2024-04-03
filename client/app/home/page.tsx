import { Bottom, Main, Top } from '@/components/layout'
import { GlobalNavigationBar } from '@/components/layout/global-navigation-bar'

export default function Home() {
  return (
    <>
      <Top className="p-4"></Top>
      <Main className="p-4"></Main>
      <Bottom>
        <GlobalNavigationBar />
      </Bottom>
    </>
  )
}
