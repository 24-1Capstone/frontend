import { useQuery } from '@tanstack/react-query'
import { getAllMeetings } from '@/api/meet'

const useAllMeetings = () => {
  return useQuery({
    queryKey: ['all-meetings'],
    queryFn: getAllMeetings,
  })
}

export { useAllMeetings }
