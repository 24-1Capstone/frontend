'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Profile } from '@/components/profile'
import { useUserInfo } from '@/hooks/queries/use-user-info'
import { buttonVariants } from '@/components/ui/button'
import { CoffeeIcon } from 'lucide-react'

function UserProfile() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data } = useUserInfo(username ?? '')
  const user = data?.[0]

  return (
    <div className="flex flex-col items-center">
      <Profile user={user} />
      <Link
        href={`/meet/device?user=${username}`}
        className={buttonVariants({
          variant: 'outline',
        })}
      >
        <CoffeeIcon className="mr-2 h-4 w-4" />
        커피챗 신청하기
      </Link>
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
