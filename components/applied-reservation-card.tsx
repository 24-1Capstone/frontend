'use client'

import { useRouter } from 'next/navigation'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { VariantProps } from 'class-variance-authority'

import { formatDateTime } from '@/lib/date'
import { createAttendee, endMeeting } from '@/api/meet'
import { Badge, BadgeProps, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { ReservationType } from '@/types/reservation'
import { deleteReservation } from '@/api/reserve'

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

  // const handleJoin = async () => {
  //   const meetingResponse = data
  //   const attendeeResponse = await createAttendee(data.meetingId)

  //   const meetingSessionConfiguration = new MeetingSessionConfiguration(
  //     meetingResponse,
  //     attendeeResponse,
  //   )

  //   await meetingManager.join(meetingSessionConfiguration)
  //   router.push('/meet/device')
  // }

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

  // const handleCancel = async () => {
  //   await endMeeting(data.meetingId)
  //   alert('취소되었습니다.')
  //   document.location.reload()
  // }

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
          {/* <Button onClick={handleJoin}>입장</Button>*/}
          <Button variant="destructive" onClick={handleCancel}>
            취소
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { AppliedReservationCard }
