'use client'

import { useRouter } from 'next/navigation'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { Button } from '@/components/ui/button'
import { MicSelection } from '@/components/chime/mic-selection'
import { MicrophoneActivityPreviewBar } from '@/components/chime/microphone-activity-preview-bar'
import { SpeakerSelection } from '@/components/chime/speaker-selection'
import { CameraSelection } from '@/components/chime/camera-selection'
import { PreviewVideo } from '@/components/chime/preview-video'

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
      <Button onClick={handleJoinMeeting}>커피챗 참가하기</Button>
    </div>
  )
}
