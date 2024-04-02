'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { GitHub } from 'react-feather'

import { Bottom, Main, Top } from '@/components/layout'
import { Button } from '@/components/ui/button'
import Logo from '@/assets/svgs/logo.svg'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  if (session) {
    router.push('/chat')
  }

  return (
    <>
      <Top className="p-4"></Top>
      <Main className="flex flex-col items-center justify-center gap-4 p-4">
        <Logo className="h-32 w-32 transition-all sm:h-48 sm:w-48" />
        <h1 className="text-4xl font-extrabold transition-all sm:text-6xl">
          ChatHub
        </h1>
      </Main>
      <Bottom className="p-4">
        <Button
          size="lg"
          className="w-full"
          onClick={() => signIn('github', { callbackUrl: '/' })}
        >
          <GitHub className="mr-2 h-4 w-4" />
          GitHub으로 계속하기
        </Button>
      </Bottom>
    </>
  )
}
