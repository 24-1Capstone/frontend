'use client'

import Cookies from 'js-cookie'

import { signOut } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function SignOutButton() {
  const router = useRouter()

  const handleSignOut = () => {
    signOut().then((response) => {
      if (response.status === 200) {
        Cookies.remove('token')
        Cookies.remove('refresh_token')
        router.push('/')
      }
    })
  }

  return (
    <Button variant="ghost" onClick={handleSignOut}>
      로그아웃
    </Button>
  )
}

export { SignOutButton }
