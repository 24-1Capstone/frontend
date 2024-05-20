'use client'

import { Profile } from '@/components/profile'
import { useMyInfo } from '@/hooks/queries/use-my-info'

export default function Page() {
  const { data } = useMyInfo()
  const user = data?.[0]

  return (
    <>
      <Profile user={user} />
      <p className="pt-16 text-center text-sm">
        프로필 수정은 GitHub를 통해서 할 수 있습니다.
      </p>
    </>
  )
}
