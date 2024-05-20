import { useRef } from 'react'
import { useLocalAudioInputActivityPreview } from 'amazon-chime-sdk-component-library-react'

import { cn } from '@/lib/utils'

function MicrophoneActivityPreviewBar({ className }: { className?: string }) {
  const activityBarRef = useRef<HTMLDivElement>(null)
  useLocalAudioInputActivityPreview(activityBarRef)

  return (
    <div className={cn('h-2 w-full rounded bg-primary-foreground', className)}>
      <div
        ref={activityBarRef}
        className="h-2 origin-left translate-x-0 rounded bg-primary"
      />
    </div>
  )
}

export { MicrophoneActivityPreviewBar }
