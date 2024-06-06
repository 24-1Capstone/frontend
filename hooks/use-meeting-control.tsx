import { useRouter } from 'next/navigation'

import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import {
  useLogger,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'

import { createAttendee, createMeeting, endMeeting } from '@/api/meet'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import type { IReservation } from '@/types/reservation'
import type { IMeeting } from '@/types/meeting'
import { useAllMeetings } from './queries/use-all-meetings'

const useMeetingControl = (data: IReservation | IMeeting) => {
  const router = useRouter()
  const meetingManager = useMeetingManager()
  const logger = useLogger()

  const { data: myInfo } = useMyInfo()
  const { refetch } = useAllMeetings()

  const join = async () => {
    const meetingResponse = await createMeeting(
      myInfo?.[0].login ?? '',
      data.receiveUserName,
    )
    const attendeeResponse = await createAttendee(meetingResponse.meetingId)

    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      meetingResponse,
      attendeeResponse,
    )

    await meetingManager.join(meetingSessionConfiguration)
    router.push('/meet/device')
  }

  const end = async (meetingId: string): Promise<void> => {
    try {
      await endMeeting(meetingId)
      alert('커피챗이 종료되었습니다.')
      refetch()
    } catch (e) {
      logger.error(`Could not end meeting: ${e}`)
    }
  }

  return { join, end }
}

export { useMeetingControl }
