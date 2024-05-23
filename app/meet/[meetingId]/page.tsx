'use client'

import { LocalVideo } from '@/components/local-video'
import { MeetingControls } from '@/components/meeting-controls'

export default function Page() {
  return (
    <div className="relative flex min-h-dvh justify-center">
      <LocalVideo />
      <MeetingControls />
    </div>
  )
}
