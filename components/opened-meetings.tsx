'use client'

import { MeetingAlert } from '@/components/meeting-alert'
import { useAllMeetings } from '@/hooks/queries/use-all-meetings'

function OpenedMeetings() {
  const { data: meetings } = useAllMeetings()

  return (
    meetings?.length !== 0 &&
    meetings?.map((meeting) => (
      <MeetingAlert key={meeting.meetingId} data={meeting} />
    ))
  )
}

export { OpenedMeetings }
