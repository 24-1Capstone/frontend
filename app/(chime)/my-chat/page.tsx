'use client'

import { useAllMeetings } from '@/hooks/queries/use-all-meetings'
import { MeetingCard } from '@/components/meeting-card'
import { useMyInfo } from '@/hooks/queries/use-my-info'

export default function Page() {
  const { data: meetings } = useAllMeetings()
  const { data: myInfo } = useMyInfo()

  const appliedMeetings = meetings?.filter(
    (meeting) => meeting.applyUserName === myInfo?.[0].login,
  )
  const receivedMeetings = meetings?.filter(
    (meeting) => meeting.receiveUserName === myInfo?.[0].login,
  )

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">내가 신청한 커피챗</h3>
      {appliedMeetings?.length === 0 ? (
        <div className="py-4 text-foreground/30">신청한 커피챗이 없습니다.</div>
      ) : (
        appliedMeetings?.map((data) => (
          <MeetingCard key={data.externalMeetingId} data={data} />
        ))
      )}
      <h3 className="mt-8 text-2xl font-bold">내가 신청받은 커피챗</h3>
      {receivedMeetings?.length === 0 ? (
        <div className="py-4 text-foreground/30">
          신청받은 커피챗이 없습니다.
        </div>
      ) : (
        receivedMeetings?.map((data) => (
          <MeetingCard key={data.externalMeetingId} data={data} />
        ))
      )}
    </div>
  )
}
