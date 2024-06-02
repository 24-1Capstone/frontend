'use client'

import { useRouter } from 'next/navigation'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { isToday } from 'date-fns'

import { formatDateTime } from '@/lib/date'
import { createAttendee, createMeeting } from '@/api/meet'
import { deleteReservation } from '@/api/reserve'
import { useMyInfo } from '@/hooks/queries/use-my-info'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { ReservationType } from '@/types/reservation'

const STATUS: Record<
  ReservationType['reservationStatus'],
  [BadgeProps['variant'], string]
> = {
  PROGRESSING: ['default', '대기'],
  CONFIRMED: ['success', '승인'],
  REFUSE: ['destructive', '거절'],
}

function AppliedReservationCard({ data }: { data: ReservationType }) {
  const router = useRouter()
  const meetingManager = useMeetingManager()

  const { data: myInfo } = useMyInfo()

  const handleJoin = async () => {
    const meetingResponse = await createMeeting(
      myInfo?.[0].login ?? '',
      data.receiveUserName,
    )
    console.log(meetingResponse)
    const attendeeResponse = await createAttendee(meetingResponse.meetingId)

    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      meetingResponse,
      attendeeResponse,
    )

    await meetingManager.join(meetingSessionConfiguration)
    router.push('/meet/device')
  }

  const handleCancel = async () => {
    try {
      const response = await deleteReservation(data.id)

      if (response === 200) {
        alert('취소되었습니다.')
        document.location.reload()
      }
    } catch (error) {
      console.error(error)
      alert('취소에 실패했습니다.')
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row justify-between space-y-0">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://github.com/${data.applyUserName}.png`}
              draggable={false}
            />
            <AvatarFallback>{data.applyUserName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-sm text-foreground/60">From</span>
            <span className="text-lg font-medium">{data.applyUserName}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 sm:flex-row-reverse">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://github.com/${data.receiveUserName}.png`}
              draggable={false}
            />
            <AvatarFallback>{data.receiveUserName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-center sm:text-right">
            <span className="text-sm text-foreground/60">To</span>
            <span className="text-lg font-medium">{data.receiveUserName}</span>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Badge variant={STATUS[data.reservationStatus][0]}>
            {STATUS[data.reservationStatus][1]}
          </Badge>
          <span className="text-muted-foreground/80">
            {formatDateTime(data.startTime)}
          </span>
        </div>
        <div className="flex gap-4">
          {data.reservationStatus !== 'CONFIRMED' ? (
            <Button variant="destructive" onClick={handleCancel}>
              취소
            </Button>
          ) : (
            isToday(data.startTime) && (
              <Button onClick={handleJoin}>입장</Button>
            )
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export { AppliedReservationCard }
