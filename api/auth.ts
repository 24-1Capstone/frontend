import axiosInstance from '@/api/instance'

const getAccessToken = async (refreshToken: string) => {
  return await axiosInstance.post('/api/token', { refreshToken })
}

const logOut = async () => {
  return await axiosInstance.post('/logout')
}

export { getAccessToken, logOut }
