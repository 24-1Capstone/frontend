'use client'

import { LocalVideo } from '@/components/local-video'
import { MeetingControls } from '@/components/meeting-controls'

export default function Page({ params }: { params: { meetingId: string } }) {
  return (
    <div className="absolute left-0 top-0 z-50 h-full max-h-dvh w-full bg-black p-4">
      <div className="relative flex h-full justify-center">
        <LocalVideo />
        <MeetingControls meetingId={params.meetingId} />
      </div>
    </div>
  )
}
