import { useQuery } from '@tanstack/react-query'
import { getAllReservations } from '@/api/reserve'

const useAllReservations = () => {
  return useQuery({
    queryKey: ['all-reservations'],
    queryFn: getAllReservations,
  })
}

export { useAllReservations }
