'use client'

import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { createMeetingWithAttendee } from '@/api/meet'
import { Button } from '@/components/ui/button'
import { MicSelection } from '@/components/mic-selection'
import { SpeakerSelection } from '@/components/speaker-selection'
import { CameraSelection } from '@/components/camera-selection'
import { MicrophoneActivityPreviewBar } from '@/components/microphone-activity-preview-bar'
import { PreviewVideo } from '@/components/preview-video'
import { useEffect } from 'react'

export default function Page() {
  const meetingManager = useMeetingManager()

  useEffect(() => {
    const configureMeeting = async () => {
      const response = await createMeetingWithAttendee()

      const meetingResponse = {
        ExternalMeetingId: response.externalMeetingId,
        MediaPlacement: {
          AudioHostUrl: response.audioHostUrl,
          AudioFallbackUrl: response.audioFallbackUrl,
          ScreenDataUrl: response.screenDataUrl,
          ScreenSharingUrl: response.screenSharingUrl,
          ScreenViewingUrl: response.screenViewingUrl,
          SignalingUrl: response.signalingUrl,
          TurnControlUrl: response.turnControlUrl,
        },
        MediaRegion: response.mediaRegion,
        MeetingArn: response.meetingArn,
        MeetingId: response.meetingId,
      }
      const attendeeResponse = response.attendees

      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        meetingResponse,
        attendeeResponse[0],
      )

      await meetingManager.join(meetingSessionConfiguration)
    }

    configureMeeting()
  }, [])

  const handleJoinMeeting = async () => {
    await meetingManager.start()
  }

  return (
    <div className="flex flex-col gap-8">
      <MicSelection />
      <MicrophoneActivityPreviewBar />
      <SpeakerSelection />
      <CameraSelection />
      <PreviewVideo />
      <Button onClick={handleJoinMeeting}>Start Meeting</Button>
    </div>
  )
}
