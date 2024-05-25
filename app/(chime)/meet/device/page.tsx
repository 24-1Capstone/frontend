'use client'

import { useRouter } from 'next/navigation'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { Button } from '@/components/ui/button'
import { MicSelection } from '@/components/mic-selection'
import { SpeakerSelection } from '@/components/speaker-selection'
import { CameraSelection } from '@/components/camera-selection'
import { MicrophoneActivityPreviewBar } from '@/components/microphone-activity-preview-bar'
import { PreviewVideo } from '@/components/preview-video'

export default function Page() {
  const meetingManager = useMeetingManager()
  const router = useRouter()

  const handleJoinMeeting = async () => {
    await meetingManager.start()
    router.push(`/meet/${meetingManager.meetingId}`)
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
