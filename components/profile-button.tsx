'use client'

import { useRouter } from 'next/navigation'
import { UserIcon, LogOutIcon } from 'lucide-react'

import { logOut } from '@/api/auth'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

function ProfileButton() {
  const router = useRouter()
  const { data: user } = useMyInfo()

  const handleLogOut = () => {
    logOut().then((response) => {
      if (response.status === 200) {
        router.push('/api/auth/logout')
      }
    })
  }

  return (
    <Drawer>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="ghost" size="icon">
            <Avatar className="p-0.5">
              <AvatarImage src={user?.[0].avatar_url} alt={user?.[0].name} />
              <AvatarFallback>{user?.[0].name}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.[0].name}님</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>내 프로필</span>
          </DropdownMenuItem>
          <DrawerTrigger asChild>
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DrawerTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
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

export { ProfileButton }
