import { Suspense } from 'react'

import { MyProfile } from '@/components/my-profile'

export default function Page() {
  return (
    <Suspense>
      <MyProfile />
    </Suspense>
  )
}
