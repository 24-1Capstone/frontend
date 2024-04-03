'use client'

import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'

function SignInButton() {
  return (
    <Button size="lg" className="w-full" onClick={() => signIn('github')}>
      <Github className="mr-2 h-4 w-4" />
      GitHub으로 계속하기
    </Button>
  )
}

export { SignInButton }
