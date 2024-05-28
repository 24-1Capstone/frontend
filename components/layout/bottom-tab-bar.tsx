'use client'

import { usePathname } from 'next/navigation'
import { Home, Calendar, User, Settings } from 'lucide-react'

import { Tab, TabBar } from '@/components/layout/tab-bar'

const TABS = [
  { icon: Home, href: '/home', title: '홈' },
  { icon: Calendar, href: '/calendar', title: '일정' },
  { icon: User, href: '/profile', title: '프로필' },
  { icon: Settings, href: '/settings', title: '설정' },
]

function BottomTabBar() {
  const pathname = usePathname()

  return (
    <TabBar>
      {TABS.map(({ icon: Icon, href, title }) => (
        <Tab key={href} href={href} selected={pathname.startsWith(href)}>
          <Icon className="h-5 w-5" />
          <span className="text-xs">{title}</span>
        </Tab>
      ))}
    </TabBar>
  )
}

export { BottomTabBar }
