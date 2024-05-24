'use client'

import { useRouter } from 'next/navigation'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { MeetingType } from '@/types/meeting'
import { createAttendee } from '@/api/meet'

function MeetingCard({ data }: { data: MeetingType }) {
  const router = useRouter()
  const meetingManager = useMeetingManager()

  const handleJoin = () => {
    const configureMeeting = async () => {
      const meetingResponse = data
      const attendeeResponse = await createAttendee(data.meetingId)

      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        meetingResponse,
        attendeeResponse,
      )

      await meetingManager.join(meetingSessionConfiguration)
    }

    configureMeeting()
    router.push('/meet/device')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data.applyUserName} → {data.receiveUserName}
        </CardTitle>
      </CardHeader>
      <CardContent>{data.externalMeetingId}</CardContent>
      <CardFooter>
        <Button onClick={handleJoin}>입장</Button>
      </CardFooter>
    </Card>
  )
}

export { MeetingCard }
