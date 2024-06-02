import axiosInstance from '@/api/instance'
import type { ReservationType } from '@/types/reservation'

const rejectReservation = async (id: number) => {
  const response = await axiosInstance.post(`/api/reservation/refuse/${id}`)
  return response.status
}

const deleteReservation = async (id: number) => {
  const response = await axiosInstance.post(`/api/reservation/delete/${id}`)
  return response.status
}

const acceptReservation = async (id: number) => {
  const response = await axiosInstance.post(`/api/reservation/approve/${id}`)
  return response.status
}

const createReservation = async (
  content: string,
  startTime: Date,
  endTime: Date,
  receiveUserName: string,
) => {
  const response = await axiosInstance.post('/api/reservation/', {
    content,
    startTime,
    endTime,
    receiveUserName,
  })
  return response.status
}

const getAllReservations = async (): Promise<ReservationType[]> => {
  const response = await axiosInstance.get('/api/reservation')
  return response.data
}

export {
  rejectReservation,
  deleteReservation,
  acceptReservation,
  createReservation,
  getAllReservations,
}
