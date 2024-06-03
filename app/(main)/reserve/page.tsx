import { Suspense } from 'react'

import { ProfileMin } from '@/components/profile-min'
import { ReserveForm } from '@/components/reserve-form'

export default function Page() {
  return (
    <Suspense>
      <div className="flex flex-col items-center gap-6">
        <ProfileMin />
        <ReserveForm />
      </div>
    </Suspense>
  )
}
