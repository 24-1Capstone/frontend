import axiosInstance from './instance'

const getUserInfo = async () => {
  return await axiosInstance.get('/users/userinfo')
}

export { getUserInfo }
