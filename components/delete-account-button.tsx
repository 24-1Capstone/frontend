'use client'

import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { deleteAccount, logOut } from '@/api/auth'
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

function DeleteAccountButton() {
  const router = useRouter()

  const handleDeleteAccount = async () => {
    await deleteAccount()
    await logOut()

    Cookies.remove('refresh_token')
    Cookies.remove('token')
    router.push('/api/auth/logout')
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link">회원탈퇴</Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-screen-sm">
        <DrawerHeader>
          <DrawerTitle className="text-center">
            계정을 삭제하시겠습니까?
          </DrawerTitle>
          <DrawerDescription className="text-center">
            모든 데이터가 삭제되며, 복구할 수 없습니다.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            회원탈퇴
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { DeleteAccountButton }
