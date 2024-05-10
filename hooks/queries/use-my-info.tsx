import { getMyInfo } from '@/api/user'
import { useQuery } from '@tanstack/react-query'

function useMyInfo() {
  return useQuery({ queryKey: ['my-info'], queryFn: getMyInfo })
}

export { useMyInfo }
