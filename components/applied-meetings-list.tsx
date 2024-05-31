'use client'

import { useAllMeetings } from '@/hooks/queries/use-all-meetings'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import { MeetingCard } from '@/components/meeting-card'

function AppliedMeetingsList() {
  const { data: meetings } = useAllMeetings()
  const { data: myInfo } = useMyInfo()

  const appliedMeetings = meetings?.filter(
    (meeting) => meeting.applyUserName === myInfo?.[0].login,
  )

  return appliedMeetings?.length === 0 ? (
    <div className="py-4 text-foreground/30">신청한 커피챗이 없습니다.</div>
  ) : (
    appliedMeetings?.map((data) => (
      <MeetingCard key={data.externalMeetingId} data={data} />
    ))
  )
}

export { AppliedMeetingsList }
