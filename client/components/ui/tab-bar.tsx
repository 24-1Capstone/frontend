import Link from 'next/link'

import { cn } from '@/lib/utils'

function Tab({
  href,
  className,
  children,
  selected,
}: {
  href: string
  className?: string
  children?: React.ReactNode
  selected?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center gap-2 border-t p-5 text-xs',
        selected && 'border-t-2 border-green-600',
        className,
      )}
    >
      {children}
    </Link>
  )
}

function TabBar({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full grid-cols-4 bg-background">{children}</div>
}

export { Tab, TabBar }
