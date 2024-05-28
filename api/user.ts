import axiosInstance from '@/api/instance'
import type { UserType } from '@/types/user'
import type { ProfileType } from '@/types/profile'

const getMyFollowers = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/api/user/followers')
  return response.data
}

const getMyFollowing = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/api/user/following')
  return response.data
}

const getMyInfo = async (): Promise<ProfileType[]> => {
  const response = await axiosInstance.get('/api/user/userinfo')
  return response.data
}

const getUserInfo = async (username: string): Promise<ProfileType[]> => {
  const response = await axiosInstance.get(`/api/users/${username}`)
  return response.data
}

export { getMyFollowers, getMyFollowing, getMyInfo, getUserInfo }
