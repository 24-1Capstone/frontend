import { getUserInfo } from '@/api/user'
import { useQuery } from '@tanstack/react-query'

const useUserInfo = (username: string) => {
  return useQuery({
    queryKey: [username, 'user-info'],
    queryFn: () => getUserInfo(username),
  })
}

export { useUserInfo }
