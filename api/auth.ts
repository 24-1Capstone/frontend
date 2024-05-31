import axiosInstance from '@/api/instance'

const getAccessToken = async (refreshToken: string) => {
  return await axiosInstance.post('/api/token', { refreshToken })
}

const logOut = async () => {
  return await axiosInstance.post('/logout')
}

const deleteAccount = async () => {
  return await axiosInstance.delete('/api/user/resign')
}

export { getAccessToken, logOut, deleteAccount }
