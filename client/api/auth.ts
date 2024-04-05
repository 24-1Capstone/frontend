import axiosInstance from './instance'

const signOut = async () => {
  return await axiosInstance.get('/logout')
}

export { signOut }
