'use client'

import { parseISO } from 'date-fns'

import { useAllReservations } from '@/hooks/queries/use-all-reservations'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import { AppliedReservationCard } from '@/components/applied-reservation-card'

function AppliedReservationsList() {
  const { data: reservations } = useAllReservations()
  const { data: myInfo } = useMyInfo()

  const appliedReservations = reservations
    ?.filter((reservation) => reservation.applyUserName === myInfo?.[0].login)
    .sort(
      (a, b) =>
        parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime(),
    )
    .sort(
      (a, b) =>
        (a.reservationStatus === 'REFUSE' ? 1 : 0) -
        (b.reservationStatus === 'REFUSE' ? 1 : 0),
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
