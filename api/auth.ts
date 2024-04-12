import axiosInstance from './instance'

const logOut = async () => {
  return await axiosInstance.post('/logout')
}

export { logOut }
