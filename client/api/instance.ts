import { cookies } from 'next/headers'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
})

axiosInstance.interceptors.request.use((config) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default axiosInstance
