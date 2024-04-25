import { getUserInfo } from '@/api/user'
import { useQuery } from '@tanstack/react-query'

function useUserInfo() {
  return useQuery({ queryKey: ['user-info'], queryFn: getUserInfo })
}

export { useUserInfo }
