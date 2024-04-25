'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserFollowers } from '@/api/user'

function useUserFollowers() {
  return useQuery({ queryKey: ['user-followers'], queryFn: getUserFollowers })
}

export { useUserFollowers }
