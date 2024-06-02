'use client'

import { useAllReservations } from '@/hooks/queries/use-all-reservations'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import { AppliedReservationCard } from '@/components/applied-reservation-card'

function AppliedReservationsList() {
  const { data: reservations } = useAllReservations()
  const { data: myInfo } = useMyInfo()

  const appliedReservations = reservations?.filter(
    (reservation) => reservation.applyUserName === myInfo?.[0].login,
  )

  return appliedReservations?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청한 커피챗이 없습니다.</div>
  ) : (
    appliedReservations?.map((data) => (
      <AppliedReservationCard key={data.id} data={data} />
    ))
  )
}

export { AppliedReservationsList }
