'use client'

import { Suspense } from 'react'
import { CoffeeIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Profile } from '@/components/profile'
import { useUserInfo } from '@/hooks/queries/use-user-info'
import { Button, buttonVariants } from '@/components/ui/button'
import { createMeeting } from '@/api/meet'
import { useMyInfo } from '@/hooks/queries/use-my-info'

function UserProfile() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data: userInfo } = useUserInfo(username ?? '')
  const { data: myInfo } = useMyInfo()

  const handleReserveMeeting = async () => {
    await createMeeting(myInfo?.[0].login ?? '', userInfo?.[0].login ?? '')
    alert('커피챗 신청이 완료되었습니다.')
  }

  return (
    <div className="flex flex-col items-center">
      <Profile user={userInfo?.[0]} />
      <Button variant="outline" onClick={handleReserveMeeting}>
        <CoffeeIcon className="mr-2 h-4 w-4" />
        커피챗 신청하기
      </Button>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <UserProfile />
    </Suspense>
  )
}
