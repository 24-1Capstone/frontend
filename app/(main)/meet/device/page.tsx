'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { createMeetingWithAttendee } from '@/api/meet'
import { Button } from '@/components/ui/button'
import { MicSelection } from '@/components/mic-selection'
import { SpeakerSelection } from '@/components/speaker-selection'
import { CameraSelection } from '@/components/camera-selection'
import { MicrophoneActivityPreviewBar } from '@/components/microphone-activity-preview-bar'
import { PreviewVideo } from '@/components/preview-video'

export default function Page() {
  const meetingManager = useMeetingManager()
  const router = useRouter()

  const [meetingId, setMeetingId] = useState<string | null>(null)

  useEffect(() => {
    const configureMeeting = async () => {
      const { attendees, ...meetingResponse } =
        await createMeetingWithAttendee()
      const attendeeResponse = attendees[0]

      setMeetingId(meetingResponse.externalMeetingId)

      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        meetingResponse,
        attendeeResponse,
      )

      await meetingManager.join(meetingSessionConfiguration)
    }

    configureMeeting()
  }, [])

  const handleJoinMeeting = async () => {
    await meetingManager.start()
    router.push(`/meet/${meetingId}}`)
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
