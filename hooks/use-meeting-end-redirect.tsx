'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
  MeetingStatus,
  useNotificationDispatch,
  Severity,
  ActionType,
  useMeetingStatus,
  useLogger,
} from 'amazon-chime-sdk-component-library-react'

const useMeetingEndRedirect = () => {
  const logger = useLogger()
  const router = useRouter()
  const dispatch = useNotificationDispatch()
  const meetingStatus = useMeetingStatus()

  useEffect(() => {
    if (meetingStatus === MeetingStatus.Ended) {
      logger.info('[useMeetingEndRedirect] Meeting ended')
      dispatch({
        type: ActionType.ADD,
        payload: {
          severity: Severity.INFO,
          message: '커피챗이 상대방에 의해 종료되었습니다.',
          autoClose: true,
          replaceAll: true,
        },
      })
      router.push('/')
    }
  }, [meetingStatus])
}

export { useMeetingEndRedirect }
