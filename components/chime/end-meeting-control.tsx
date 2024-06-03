'use client'

import { useRouter } from 'next/navigation'
import {
  useLogger,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'
import { PhoneIcon } from 'lucide-react'

import { endMeeting } from '@/api/meet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

function EndMeetingControl() {
  const logger = useLogger()
  const router = useRouter()
  const meetingManager = useMeetingManager()

  const leaveMeeting = async (): Promise<void> => {
    router.push('/')
  }

  const endMeetingForAll = async (): Promise<void> => {
    try {
      if (meetingManager.meetingId) {
        await endMeeting(meetingManager.meetingId)
        router.push('/')
      }
    } catch (e) {
      logger.error(`Could not end meeting: ${e}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive" size="icon" className="rounded-full">
          <PhoneIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={endMeetingForAll}>
          커피챗 종료하기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={leaveMeeting}>
          커피챗 나가기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { EndMeetingControl }
