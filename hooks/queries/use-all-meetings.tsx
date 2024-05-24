import { useQuery } from '@tanstack/react-query'
import { getAllMeetings } from '@/api/meet'

function useAllMeetings() {
  return useQuery({ queryKey: ['all-meetings'], queryFn: getAllMeetings })
}

export { useAllMeetings }
