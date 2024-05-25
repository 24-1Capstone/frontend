'use client'

import {
  BackgroundBlurProvider,
  BackgroundReplacementProvider,
  UserActivityProvider,
  VoiceFocusProvider,
} from 'amazon-chime-sdk-component-library-react'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserActivityProvider>
      <VoiceFocusProvider>
        <BackgroundBlurProvider>
          <BackgroundReplacementProvider>
            {children}
          </BackgroundReplacementProvider>
        </BackgroundBlurProvider>
      </VoiceFocusProvider>
    </UserActivityProvider>
  )
}

export default Providers
