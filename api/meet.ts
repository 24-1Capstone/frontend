import axiosInstance from './instance'

const createMeetingWithAttendee = async () => {
  const response = await axiosInstance.post('/api/meetings/attendees')
  return response.data
}

export { createMeetingWithAttendee }
