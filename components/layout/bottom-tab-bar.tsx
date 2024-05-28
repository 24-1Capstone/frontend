'use client'

import { usePathname } from 'next/navigation'
import { MessageCircleIcon, UsersRoundIcon, WrenchIcon } from 'lucide-react'

import { Tab, TabBar } from '@/components/layout/tab-bar'

const TABS = [
  { icon: UsersRoundIcon, href: '/users', title: '사용자' },
  { icon: MessageCircleIcon, href: '/my-chat', title: '나의 커피챗' },
  { icon: WrenchIcon, href: '/settings', title: '설정' },
]

function BottomTabBar() {
  const pathname = usePathname()

  return (
    <TabBar>
      {TABS.map(({ icon: Icon, href, title }) => (
        <Tab key={href} href={href}>
          <Icon
            className="h-5 w-5"
            fill={
              pathname.startsWith(href)
                ? 'hsl(var(--primary))'
                : 'hsl(var(--background))'
            }
          />
          <span className="text-xs">{title}</span>
        </Tab>
      ))}
    </TabBar>
  )
}

export { BottomTabBar }
