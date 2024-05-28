import Link from 'next/link'

import { cn } from '@/lib/utils'

function Tab({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center gap-2 border-t p-3 text-xs',
        className,
      )}
    >
      {children}
    </Link>
  )
}

function TabBar({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full grid-cols-3 bg-background">{children}</div>
}

export { Tab, TabBar }
