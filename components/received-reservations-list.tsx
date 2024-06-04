'use client'

import { parseISO } from 'date-fns'

import { useAllReservations } from '@/hooks/queries/use-all-reservations'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import { ReservationCard } from '@/components/reservation-card'

function ReceivedReservationsList() {
  const { data: reservations, refetch } = useAllReservations()
  const { data: myInfo } = useMyInfo()

  const receivedReservations = reservations
    ?.filter((reservation) => reservation.receiveUserName === myInfo?.[0].login)
    .sort(
      (a, b) =>
        parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime(),
    )
    .sort(
      (a, b) =>
        (a.reservationStatus === 'REFUSE' ? 1 : 0) -
        (b.reservationStatus === 'REFUSE' ? 1 : 0),
    )

  return receivedReservations?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청받은 커피챗이 없습니다.</div>
  ) : (
    receivedReservations?.map((data) => (
      <ReservationCard
        key={data.id}
        data={data}
        type="RECEIVED"
        onChangeStatus={refetch}
      />
    ))
  )
}

export { ReceivedReservationsList }
