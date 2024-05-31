'use client'

import { Profile } from '@/components/profile'
import { useMyInfo } from '@/hooks/queries/use-my-info'

function MyProfile() {
  const { data: user } = useMyInfo()

  return (
    <>
      <Profile user={user?.[0]} />
      <p className="pt-16 text-center text-sm">
        프로필 수정은 GitHub를 통해서 할 수 있습니다.
      </p>
    </>
  )
}

export { MyProfile }
