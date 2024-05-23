import { cn } from '@/lib/utils'

const Bottom = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div className={cn('sticky bottom-0 z-40 bg-background', className)}>
      {children}
    </div>
  )
}

export { Bottom }
