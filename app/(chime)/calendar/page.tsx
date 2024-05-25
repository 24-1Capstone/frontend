'use client'

import { useAllMeetings } from '@/hooks/queries/use-all-meetings'
import { MeetingCard } from '@/components/meeting-card'

export default function Page() {
  const { data: meetings } = useAllMeetings()

  return (
    <div className="flex flex-col gap-4">
      {meetings?.map((data) => (
        <MeetingCard key={data.externalMeetingId} data={data} />
      ))}
    </div>
  )
}
