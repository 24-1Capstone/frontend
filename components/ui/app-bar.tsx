import { cn } from '@/lib/utils'

function AppBar({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex w-full items-center border-b bg-background px-4 py-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

function Start({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn('inline-flex w-1/2 items-center justify-start', className)}
    >
      {children}
    </div>
  )
}

function Center({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('inline-flex shrink-0 items-center', className)}>
      {children}
    </div>
  )
}

function End({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn('inline-flex w-1/2 items-center justify-end', className)}
    >
      {children}
    </div>
  )
}

export { AppBar, Start, Center, End }
