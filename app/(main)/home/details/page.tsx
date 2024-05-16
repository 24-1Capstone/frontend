'use client'

import { useSearchParams } from 'next/navigation'

import { Profile } from '@/components/profile'
import { useUserInfo } from '@/hooks/queries/use-user-info'

export default function UserProfile() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data } = useUserInfo(username ?? '')
  const user = data?.[0]

  return <Profile user={user} />
}
