'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CoffeeIcon } from 'lucide-react'

import { useUserInfo } from '@/hooks/queries/use-user-info'
import { Button } from '@/components/ui/button'
import { Profile } from '@/components/profile'

function UserProfile() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data: userInfo, isLoading } = useUserInfo(username ?? '')

  const handleReserveMeeting = async () => {
    router.push(`/reserve?user=${userInfo?.[0].login}`)
  }

  return (
    <div className="flex flex-col items-center">
      <Profile user={userInfo?.[0]} />
      <Button
        variant="outline"
        onClick={handleReserveMeeting}
        disabled={isLoading}
      >
        <CoffeeIcon className="mr-2 h-4 w-4" />
        커피챗 신청하기
      </Button>
    </div>
  )
}

export { UserProfile }
