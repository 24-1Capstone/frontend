import { parseISO } from 'date-fns'

import { useAllReservations } from '@/hooks/queries/use-all-reservations'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import type { IReservation } from '@/types/reservation'

const useReservations = () => {
  const { data: reservations, isLoading, refetch } = useAllReservations()
  const { data: myInfo } = useMyInfo()

  const sort = (data: IReservation[]) => {
    return data
      .sort(
        (a, b) =>
          parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime(),
      )
      .sort(
        (a, b) =>
          (a.reservationStatus === 'REFUSE' ? 1 : 0) -
          (b.reservationStatus === 'REFUSE' ? 1 : 0),
      )
  }

  const appliedReservations = isLoading
    ? []
    : sort(
        reservations!.filter(
          (reservation) => reservation.applyUserName === myInfo?.[0].login,
        ),
      )

  const receivedReservations = isLoading
    ? []
    : sort(
        reservations!.filter(
          (reservation) => reservation.receiveUserName === myInfo?.[0].login,
        ),
      )

  return { appliedReservations, receivedReservations, refetch }
}

export { useReservations }
