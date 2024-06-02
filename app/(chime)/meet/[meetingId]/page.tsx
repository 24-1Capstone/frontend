'use client'

import { useMeetingEndRedirect } from '@/hooks/use-meeting-end-redirect'
import { LocalVideo } from '@/components/chime/local-video'
import { RemoteVideos } from '@/components/chime/remote-video'
import { MeetingControls } from '@/components/chime/meeting-controls'

export default function Page() {
  useMeetingEndRedirect()

  return (
    <div className="relative flex h-dvh w-full justify-center bg-primary">
      <RemoteVideos />
      <LocalVideo />
      <MeetingControls />
    </div>
  )
}
