'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js'

import { useUserInfo } from '@/hooks/queries/use-user-info'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createMeetingWithAttendee } from '@/api/meet'

function Meet() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data } = useUserInfo(username ?? '')
  const user = data?.[0]

  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>(
    [],
  )
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    [],
  )

  const handleJoinMeeting = async () => {
    const response = await createMeetingWithAttendee()

    const logger = new ConsoleLogger('MyLogger', LogLevel.INFO)
    const deviceController = new DefaultDeviceController(logger)

    const audioDevices = await deviceController.listAudioInputDevices()
    const videoDevices = await deviceController.listVideoInputDevices()

    setAudioInputDevices(audioDevices)
    setVideoInputDevices(videoDevices)

    const configuration = new MeetingSessionConfiguration(response)

    const meetingSession = new DefaultMeetingSession(
      configuration,
      logger,
      deviceController,
    )
  }

  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue
            placeholder={
              audioInputDevices[0]?.label ?? 'Select audio input device'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {audioInputDevices.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue
            placeholder={
              videoInputDevices[0]?.label ?? 'Select video input device'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {videoInputDevices.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleJoinMeeting}>Start Meeting</Button>
    </>
  )
}

export default function Page() {
  return (
    <Suspense>
      <Meet />
    </Suspense>
  )
}
