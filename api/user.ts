import axiosInstance from './instance'

const getUserFollowers = async () => {
  return await axiosInstance.get('/user/followers')
}

const getUserFollowing = async () => {
  return await axiosInstance.get('/user/following')
}

const getUserInfo = async () => {
  return await axiosInstance.get('/api/users/userinfo')
}

export { getUserFollowers, getUserFollowing, getUserInfo }
