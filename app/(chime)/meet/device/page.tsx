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
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">마이크</h3>
        <MicSelection />
        <MicrophoneActivityPreviewBar />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">스피커</h3>
        <SpeakerSelection />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">카메라</h3>
        <CameraSelection />
        <PreviewVideo />
      </div>
      <Button onClick={handleJoinMeeting}>커피챗 참가하기</Button>
    </div>
  )
}
