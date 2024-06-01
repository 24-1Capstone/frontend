'use client'

import React from 'react'
import { useUserActivityState } from 'amazon-chime-sdk-component-library-react'

import { cn } from '@/lib/utils'
import { AudioInputVFControl } from '@/components/chime/audio-input-vf-control'
import { EndMeetingControl } from '@/components/chime/end-meeting-control'
import { VideoInputTransformControl } from '@/components/chime/video-input-transform-control'
import { AudioOutputControl } from '@/components/chime/audio-output-control'

function MeetingControls() {
  const { isUserActive } = useUserActivityState()

  return (
    <div
      className={cn(
        'absolute bottom-2 z-50 transition duration-300',
        !isUserActive && 'opacity-0',
      )}
    >
      <div className="flex items-center justify-center gap-4 rounded-full bg-background/10 p-2 shadow">
        <AudioInputVFControl />
        <VideoInputTransformControl />
        <AudioOutputControl />
        <EndMeetingControl />
      </div>
    </div>
  )
}

export { MeetingControls }
