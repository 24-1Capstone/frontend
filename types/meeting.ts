interface MeetingType {
  externalMeetingId: string
  mediaPlacement: {
    audioFallbackUrl: string
    audioHostUrl: string
    eventIngestionUrl: string
    screenDataUrl: string
    screenSharingUrl: string
    screenViewingUrl: string
    signalingUrl: string
    turnControlUrl: string
  }
  mediaRegion: string
  meetingArn: string
  meetingId: string
  applyUserName: string
  receiveUserName: string
}

export type { MeetingType }
