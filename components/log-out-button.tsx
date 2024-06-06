'use client'

import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { logOut } from '@/api/auth'
import { useMyInfo } from '@/hooks/queries/use-my-info'
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
} from './ui/drawer'

function LogOutButton() {
  const router = useRouter()
  const { data: user } = useMyInfo()

  const handleLogOut = () => {
    logOut().then(() => {
      Cookies.remove('refresh_token')
      Cookies.remove('token')
      router.push('/')
    })
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>로그아웃</Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-screen-sm">
        <DrawerHeader>
          <DrawerTitle className="text-center">{user?.[0].name}</DrawerTitle>
          <DrawerDescription className="text-center">
            로그아웃하시겠습니까?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={handleLogOut}>로그아웃</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { LogOutButton }
