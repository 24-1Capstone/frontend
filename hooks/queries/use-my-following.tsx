import { getMyFollowing } from '@/api/user'
import { useQuery } from '@tanstack/react-query'

function useMyFollowing() {
  return useQuery({ queryKey: ['my-following'], queryFn: getMyFollowing })
}

export { useMyFollowing }
