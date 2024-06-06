import {
  acceptReservation,
  deleteReservation,
  rejectReservation,
} from '@/api/reserve'
import { useReservations } from '@/hooks/use-reservations'
import type { IReservation } from '@/types/reservation'

const useReservationControl = (data: IReservation) => {
  const { refetch } = useReservations()

  const accept = async () => {
    try {
      const response = await acceptReservation(data.id)

      if (response === 200) {
        alert(`${data.applyUserName}님의 요청을 수락했습니다.`)
        refetch()
      }
    } catch (error) {
      console.error(error)
      alert('수락에 실패했습니다.')
    }
  }

  const reject = async () => {
    try {
      const response = await rejectReservation(data.id)

      if (response === 200) {
        alert(`${data.applyUserName}님의 요청을 거절했습니다.`)
        refetch()
      }
    } catch (error) {
      console.error(error)
      alert('거절에 실패했습니다.')
    }
  }

  const cancel = async () => {
    try {
      const response = await deleteReservation(data.id)

      if (response === 200) {
        alert('취소되었습니다.')
        refetch()
      }
    } catch (error) {
      console.error(error)
      alert('취소에 실패했습니다.')
    }
  }

  return { accept, reject, cancel }
}

export { useReservationControl }
