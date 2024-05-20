'use client'

import { useEffect, useRef } from 'react'
import {
  useAudioVideo,
  useLocalVideo,
  useLogger,
  useMeetingManager,
  useVideoInputs,
} from 'amazon-chime-sdk-component-library-react'
import { Badge } from './ui/badge'

function PreviewVideo() {
  const logger = useLogger()
  const audioVideo = useAudioVideo()
  const { selectedDevice } = useVideoInputs()
  const videoEl = useRef<HTMLVideoElement>(null)
  const meetingManager = useMeetingManager()
  const { setIsVideoEnabled } = useLocalVideo()

  useEffect(() => {
    const videoElement = videoEl.current
    return () => {
      if (videoElement) {
        audioVideo?.stopVideoPreviewForVideoInput(videoElement)
        audioVideo?.stopVideoInput()
        setIsVideoEnabled(false)
      }
    }
  }, [audioVideo])

  useEffect(() => {
    async function startPreview() {
      if (!audioVideo || !selectedDevice || !videoEl.current) return

      try {
        await meetingManager.startVideoInputDevice(selectedDevice)
        audioVideo.startVideoPreviewForVideoInput(videoEl.current)
        setIsVideoEnabled(true)
      } catch (error) {
        logger.error('Failed to start video preview')
      }
    }

    startPreview()
  }, [audioVideo, selectedDevice])

  return (
    <div className="relative">
      <video ref={videoEl} className="rounded-xl" />
      <Badge className="absolute bottom-2 left-2">Preview</Badge>
    </div>
  )
}

export { PreviewVideo }
