'use client'

import { useAllMeetings } from '@/hooks/queries/use-all-meetings'
import { MeetingCard } from '@/components/meeting-card'
import { useMyInfo } from '@/hooks/queries/use-my-info'

function ReceivedMeetingsList() {
  const { data: meetings } = useAllMeetings()
  const { data: myInfo } = useMyInfo()

  const receivedMeetings = meetings?.filter(
    (meeting) => meeting.receiveUserName === myInfo?.[0].login,
  )

  return receivedMeetings?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청받은 커피챗이 없습니다.</div>
  ) : (
    receivedMeetings?.map((data) => (
      <MeetingCard key={data.externalMeetingId} data={data} />
    ))
  )
}

export { ReceivedMeetingsList }
