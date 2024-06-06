'use client'

import { useReservations } from '@/hooks/use-reservations'
import { ReservationCard } from '@/components/reservation-card'

function AppliedReservationsList() {
  const { appliedReservations } = useReservations()

  return appliedReservations?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청한 커피챗이 없습니다.</div>
  ) : (
    appliedReservations?.map((data) => (
      <ReservationCard key={data.id} data={data} type="APPLIED" />
    ))
  )
}

export { AppliedReservationsList }
