import { forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const VideoTile = forwardRef<
  HTMLVideoElement,
  { label?: string; className?: string }
>(({ label, className }, videoEl) => {
  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      <video ref={videoEl} className="h-full w-full" />
      {label && <Badge className="absolute bottom-2 left-2">{label}</Badge>}
    </div>
  )
})

VideoTile.displayName = 'VideoTile'

export { VideoTile }
