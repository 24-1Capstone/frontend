'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { AppBar, Center, End, Start } from '@/components/layout/app-bar'
import { Button } from '@/components/ui/button'
import { LogOutButton } from '@/components/log-out-button'

const title: { [key: string]: string } = {
  home: '홈',
  calendar: '일정',
  profile: '프로필',
  settings: '설정',
}

function TopAppBar() {
  const router = useRouter()
  const pathname = usePathname()

  const routes = pathname.split('/').filter((path) => path !== '')

  return (
    <AppBar>
      <Start>
        {routes.length > 1 && (
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </Start>
      <Center>
        <h2 className="text-xl font-bold">{title[routes[0]]}</h2>
      </Center>
      <End>
        <LogOutButton />
      </End>
    </AppBar>
  )
}

export { TopAppBar }
