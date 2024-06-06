'use client'

import { useReservations } from '@/hooks/use-reservations'
import { ReservationCard } from '@/components/reservation-card'

function ReceivedReservationsList() {
  const { receivedReservations } = useReservations()

  return receivedReservations?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청받은 커피챗이 없습니다.</div>
  ) : (
    receivedReservations?.map((data) => (
      <ReservationCard key={data.id} data={data} type="RECEIVED" />
    ))
  )
}

export { ReceivedReservationsList }
