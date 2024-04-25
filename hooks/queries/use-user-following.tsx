import { getUserFollowing } from '@/api/user'
import { useQuery } from '@tanstack/react-query'

function useUserFollowing() {
  return useQuery({ queryKey: ['user-following'], queryFn: getUserFollowing })
}

export { useUserFollowing }
