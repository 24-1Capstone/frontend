import axiosInstance from '@/api/instance'
import type { IMeeting } from '@/types/meeting'

const getAllMeetings = async (): Promise<IMeeting[]> => {
  const response = await axiosInstance.get(`/api/meetings`)
  return response.data
}

const createMeeting = async (
  applyUserName: string,
  receiveUserName: string,
): Promise<IMeeting> => {
  const response = await axiosInstance.post(`/api/meetings`, {
    applyUserName,
    receiveUserName,
  })
  return response.data
}

const createAttendee = async (meetingId: string) => {
  const response = await axiosInstance.post(
    `/api/meetings/${meetingId}/attendees`,
  )
  return response.data
}

const endMeeting = async (meetingId: string) => {
  const response = await axiosInstance.delete(`/api/meetings/${meetingId}`)
  return response.status
}

export { getAllMeetings, createMeeting, createAttendee, endMeeting }
