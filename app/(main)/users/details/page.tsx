import { Suspense } from 'react'

import { UserProfile } from '@/components/user-profile'

export default function Page() {
  return (
    <Suspense>
      <UserProfile />
    </Suspense>
  )
}
