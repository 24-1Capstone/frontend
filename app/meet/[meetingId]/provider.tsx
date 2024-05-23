'use client'

import {
  BackgroundBlurProvider,
  BackgroundReplacementProvider,
  MeetingProvider,
  UserActivityProvider,
  VoiceFocusProvider,
} from 'amazon-chime-sdk-component-library-react'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MeetingProvider>
      <UserActivityProvider>
        <VoiceFocusProvider>
          <BackgroundBlurProvider>
            <BackgroundReplacementProvider>
              {children}
            </BackgroundReplacementProvider>
          </BackgroundBlurProvider>
        </VoiceFocusProvider>
      </UserActivityProvider>
    </MeetingProvider>
  )
}

export default Providers
