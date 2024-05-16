'use client'

import { Profile } from '@/components/profile'
import { useMyInfo } from '@/hooks/queries/use-my-info'

export default function MyProfile() {
  const { data } = useMyInfo()
  const user = data?.[0]

  return <Profile user={user} />
}
