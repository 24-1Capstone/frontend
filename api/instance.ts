import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token')

  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default axiosInstance
