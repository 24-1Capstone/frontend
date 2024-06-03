import axiosInstance from '@/api/instance'
import type { IUser } from '@/types/user'
import type { IProfile } from '@/types/profile'

const getMyFollowers = async (): Promise<IUser[]> => {
  const response = await axiosInstance.get('/api/user/followers')
  return response.data
}

const getMyFollowing = async (): Promise<IUser[]> => {
  const response = await axiosInstance.get('/api/user/following')
  return response.data
}

const getMyInfo = async (): Promise<IProfile[]> => {
  const response = await axiosInstance.get('/api/user/userinfo')
  return response.data
}

const getUserInfo = async (username: string): Promise<IProfile[]> => {
  const response = await axiosInstance.get(`/api/users/${username}`)
  return response.data
}

export { getMyFollowers, getMyFollowing, getMyInfo, getUserInfo }
