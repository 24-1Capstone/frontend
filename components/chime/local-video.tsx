'use client'

import { useEffect, useRef } from 'react'
import {
  useApplyVideoObjectFit,
  useAudioVideo,
  useLocalVideo,
} from 'amazon-chime-sdk-component-library-react'

import { cn } from '@/lib/utils'
import { VideoTile } from '@/components/chime/video-tile'

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
    <VideoTile
      className={cn(
        'absolute right-4 top-4 w-1/3 shadow-xl',
        !isVideoEnabled && 'hidden',
      )}
      label="Me"
      ref={videoEl}
    />
  )
}

export { LocalVideo }
