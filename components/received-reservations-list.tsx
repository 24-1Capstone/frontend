'use client'

import { useAllReservations } from '@/hooks/queries/use-all-reservations'
import { ReceivedReservationCard } from '@/components/received-reservation-card'
import { useMyInfo } from '@/hooks/queries/use-my-info'

function ReceivedReservationsList() {
  const { data: reservations } = useAllReservations()
  const { data: myInfo } = useMyInfo()

  const receivedReservations = reservations?.filter(
    (reservation) => reservation.receiveUserName === myInfo?.[0].login,
  )

  console.log(receivedReservations)

  return receivedReservations?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청받은 커피챗이 없습니다.</div>
  ) : (
    receivedReservations?.map((data) => (
      <ReceivedReservationCard key={data.id} data={data} />
    ))
  )
}

export { ReceivedReservationsList }
