import axiosInstance from './instance'

const createMeetingWithAttendee = async () => {
  const response = await axiosInstance.post('/api/meetings/attendees')
  return response.data
}

const endMeeting = async (meetingId: string) => {
  const response = await axiosInstance.delete(`/api/meetings/${meetingId}`)
  return response.data
}

export { createMeetingWithAttendee, endMeeting }
