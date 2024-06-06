'use client'

import { useMyInfo } from '@/hooks/queries/use-my-info'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IMeeting } from '@/types/meeting'
import { useMeetingControl } from '@/hooks/use-meeting-control'

function MeetingAlert({ data }: { data: IMeeting }) {
  const { join, end } = useMeetingControl(data)

  const { data: myInfo } = useMyInfo()
  const otherAttendee =
    data.applyUserName === myInfo?.[0].login
      ? data.receiveUserName
      : data.applyUserName

  return (
    <Alert variant="primary" className="mb-8">
      <div className="mb-4 flex gap-6">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`https://github.com/${otherAttendee}.png`}
            draggable={false}
          />
          <AvatarFallback>{otherAttendee}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <AlertTitle>{otherAttendee}님과 진행 중인 커피챗</AlertTitle>
          <AlertDescription>
            다른 커피챗에 참여하려면 진행 중인 커피챗을 종료해주세요.
          </AlertDescription>
        </div>
      </div>
      <AlertDescription className="flex gap-4">
        <Button className="w-full" onClick={join}>
          이어하기
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => end(data.meetingId)}
        >
          종료하기
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export { MeetingAlert }
