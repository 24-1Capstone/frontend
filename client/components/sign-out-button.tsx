'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'

function SignOutButton() {
  return (
    <Button variant="ghost" onClick={() => signOut()}>
      로그아웃
    </Button>
  )
}

export { SignOutButton }
