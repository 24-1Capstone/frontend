import axiosInstance from './instance'
import { UserType } from '@/types/user'

const getUserFollowers = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/user/followers')
  return response.data
}

const getUserFollowing = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get('/user/following')
  return response.data
}

const getUserInfo = async () => {
  return await axiosInstance.get('/api/users/userinfo')
}

export { getUserFollowers, getUserFollowing, getUserInfo }
