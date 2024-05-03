import axiosInstance from './instance'
import type { UserType } from '@/types/user'
import type { ProfileType } from '@/types/profile'

const getUserFollowers = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/api/user/followers')
  return response.data
}

const getUserFollowing = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/api/user/following')
  return response.data
}

const getUserInfo = async (): Promise<ProfileType> => {
  const response = await axiosInstance.get('/api/userinfo')
  return response.data
}

export { getUserFollowers, getUserFollowing, getUserInfo }
