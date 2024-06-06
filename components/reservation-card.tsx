'use client'

import { isToday } from 'date-fns'

import { formatDateTime } from '@/lib/date'
import { useMeetingControl } from '@/hooks/use-meeting-control'
import { useReservationControl } from '@/hooks/use-reservation-control'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { IReservation } from '@/types/reservation'

const STATUS: Record<
  IReservation['reservationStatus'],
  [BadgeProps['variant'], string]
> = {
  PROGRESSING: ['default', '대기'],
  CONFIRMED: ['success', '승인'],
  REFUSE: ['destructive', '거절'],
}

function ReservationCard({
  type,
  data,
}: {
  type: 'APPLIED' | 'RECEIVED'
  data: IReservation
}) {
  const { join } = useMeetingControl(data)
  const { accept, reject, cancel } = useReservationControl(data)

  const renderButtons = () => {
    if (data.reservationStatus === 'CONFIRMED') {
      return isToday(data.startTime) && <Button onClick={join}>입장</Button>
    } else {
      switch (type) {
        case 'APPLIED':
          return (
            <Button variant="destructive" onClick={cancel}>
              취소
            </Button>
          )
        case 'RECEIVED':
          return (
            data.reservationStatus === 'PROGRESSING' && (
              <>
                <Button variant="success" onClick={accept}>
                  승인
                </Button>
                <Button variant="destructive" onClick={reject}>
                  거절
                </Button>
              </>
            )
          )
        default:
          return null
      }
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
      {data.content.length !== 0 && (
        <CardContent className="flex-col text-sm text-foreground/50">
          <span className="font-semibold text-foreground/70">
            {type === 'APPLIED'
              ? '내가 보낸 메시지'
              : `${data.applyUserName}님이 보낸 메시지`}
          </span>
          <p>{data.content}</p>
        </CardContent>
      )}
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Badge variant={STATUS[data.reservationStatus][0]}>
            {STATUS[data.reservationStatus][1]}
          </Badge>
          <span className="text-muted-foreground/80">
            {formatDateTime(data.startTime)}
          </span>
        </div>
        <div className="flex gap-4">{renderButtons()}</div>
      </CardFooter>
    </Card>
  )
}

export { ReservationCard }
