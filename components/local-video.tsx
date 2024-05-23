'use client'

import { useEffect, useRef } from 'react'
import {
  useApplyVideoObjectFit,
  useAudioVideo,
  useLocalVideo,
} from 'amazon-chime-sdk-component-library-react'

import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

function LocalVideo() {
  const { tileId, isVideoEnabled } = useLocalVideo()
  const audioVideo = useAudioVideo()
  const videoEl = useRef<HTMLVideoElement>(null)
  useApplyVideoObjectFit(videoEl)

  useEffect(() => {
    if (!audioVideo || !tileId || !videoEl.current || !isVideoEnabled) {
      return
    }

    audioVideo.bindVideoElement(tileId, videoEl.current)

    return () => {
      const tile = audioVideo.getVideoTile(tileId)
      if (tile) {
        audioVideo.unbindVideoElement(tileId)
      }
    }
  }, [audioVideo, tileId, isVideoEnabled])

  return (
    <div className={cn('relative', !isVideoEnabled && 'hidden')}>
      <video ref={videoEl} className="rounded-xl" />
      <Badge className="absolute bottom-2 left-2">Me</Badge>
    </div>
  )
}

export { LocalVideo }
