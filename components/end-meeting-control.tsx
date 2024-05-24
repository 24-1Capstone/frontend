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
} from './ui/dropdown-menu'
import { Button } from './ui/button'

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
          End meeting for all
        </DropdownMenuItem>
        <DropdownMenuItem onClick={leaveMeeting}>
          Leave Meeting
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { EndMeetingControl }
