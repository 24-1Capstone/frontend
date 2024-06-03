'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { AppBar, Center, End, Start } from '@/components/layout/app-bar'
import { Button } from '@/components/ui/button'
import { ProfileButton } from '@/components/profile-button'

const TITLE: { [key: string]: string } = {
  users: '사용자',
  'my-chat': '나의 커피챗',
  reserve: '커피챗 신청',
  meet: '장치 설정',
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
        <h2 className="text-xl font-bold">{TITLE[routes[0]]}</h2>
      </Center>
      <End>
        <ProfileButton />
      </End>
    </AppBar>
  )
}

export { TopAppBar }
