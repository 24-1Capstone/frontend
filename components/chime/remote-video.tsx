'use client'

import { useEffect, useRef } from 'react'
import {
  useApplyVideoObjectFit,
  useAudioVideo,
  useRemoteVideoTileState,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react'

import { VideoTile } from '@/components/chime/video-tile'

function RemoteVideo({ name, tileId }: { name?: string; tileId: number }) {
  const audioVideo = useAudioVideo()
  const videoEl = useRef<HTMLVideoElement>(null)
  useApplyVideoObjectFit(videoEl)

  useEffect(() => {
    if (!audioVideo || !videoEl.current) {
      return
    }

    audioVideo.bindVideoElement(tileId, videoEl.current)

    return () => {
      const tile = audioVideo.getVideoTile(tileId)
      if (tile) {
        audioVideo.unbindVideoElement(tileId)
      }
    }
  }, [audioVideo, tileId])

  return <VideoTile className="h-full w-full" label={name} ref={videoEl} />
}

function RemoteVideos() {
  const { roster } = useRosterState()
  const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState()

  return (
    <>
      {tiles.map((tileId) => {
        const attendee = roster[tileIdToAttendeeId[tileId]] || {}
        const { externalUserId }: any = attendee
        return (
          <RemoteVideo key={tileId} tileId={tileId} name={externalUserId} />
        )
      })}
    </>
  )
}

export { RemoteVideos }
