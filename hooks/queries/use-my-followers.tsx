import { useQuery } from '@tanstack/react-query'
import { getMyFollowers } from '@/api/user'

const useMyFollowers = () => {
  return useQuery({ queryKey: ['my-followers'], queryFn: getMyFollowers })
}

export { useMyFollowers }
