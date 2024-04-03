'use client'

import { usePathname } from 'next/navigation'
import {
  Home as HomeIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Settings as SettingsIcon,
} from 'react-feather'

import { Tab, TabBar } from '@/components/ui/tab-bar'

const TABS = [
  { icon: HomeIcon, href: '/home', title: '홈' },
  { icon: CalendarIcon, href: '/calendar', title: '일정' },
  { icon: UserIcon, href: '/profile', title: '프로필' },
  { icon: SettingsIcon, href: '/settings', title: '설정' },
]

function GlobalNavigationBar() {
  const pathname = usePathname()

  return (
    <TabBar>
      {TABS.map(({ icon: Icon, href, title }) => (
        <Tab key={href} href={href} selected={pathname.startsWith(href)}>
          <Icon className="h-5 w-5" />
          <span className="sr-only">{title}</span>
        </Tab>
      ))}
    </TabBar>
  )
}

export { GlobalNavigationBar }
