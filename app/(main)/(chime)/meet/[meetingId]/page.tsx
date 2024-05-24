'use client'

import { LocalVideo } from '@/components/local-video'
import { MeetingControls } from '@/components/meeting-controls'
import { RemoteVideos } from '@/components/remote-video'

export default function Page() {
  return (
    <div className="absolute left-0 top-0 z-50 h-full max-h-dvh w-full bg-black p-4">
      <div className="relative flex h-full justify-center">
        <RemoteVideos />
        <LocalVideo />
        <MeetingControls />
      </div>
    </div>
  )
}
