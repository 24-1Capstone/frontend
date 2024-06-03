'use client'

import { useEffect, useState } from 'react'

import { getAllMeetings } from '@/api/meet'
import { MeetingAlert } from '@/components/meeting-alert'
import { IMeeting } from '@/types/meeting'

function OpenedMeetings() {
  const [meetings, setMeetings] = useState<IMeeting[]>([])

  useEffect(() => {
    async function fetchMeetings() {
      const openedMeetings = await getAllMeetings()
      setMeetings(openedMeetings)
    }

    fetchMeetings()
  }, [])

  return (
    meetings.length !== 0 &&
    meetings.map((meeting) => (
      <MeetingAlert key={meeting.meetingId} data={meeting} />
    ))
  )
}

export { OpenedMeetings }
