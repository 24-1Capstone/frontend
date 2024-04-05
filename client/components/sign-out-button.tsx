'use client'

import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { signOut } from '@/api/auth'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">로그아웃</Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-screen-sm">
        <DrawerHeader>
          <DrawerTitle className="text-center">유저명</DrawerTitle>
          <DrawerDescription className="text-center">
            로그아웃하시겠습니까?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={handleSignOut}>로그아웃</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { SignOutButton }
