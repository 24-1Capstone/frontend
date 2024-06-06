'use client'

import { useSearchParams } from 'next/navigation'

import { useUserInfo } from '@/hooks/queries/use-user-info'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function ProfileMin() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data: userInfo } = useUserInfo(username ?? '')

  return (
    <div className="my-8 flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={userInfo?.[0].avatar_url} draggable={false} />
        <AvatarFallback>{userInfo?.[0].login}</AvatarFallback>
      </Avatar>
      <p>
        <span className="font-semibold">
          {userInfo?.[0].name}({userInfo?.[0].login})
        </span>
        님께
        <br />
        커피챗을 신청합니다.
      </p>
    </div>
  )
}

export { ProfileMin }
