import Link from 'next/link'
import { GitHub } from 'react-feather'

import { Bottom, Main, Top } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <Top className="p-4">Header</Top>
      <Main className="p-4">Main</Main>
      <Bottom className="p-4">
        <Button size="lg" className="w-full" asChild>
          <Link
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
          >
            <GitHub className="mr-2 h-4 w-4" />
            GitHub으로 계속하기
          </Link>
        </Button>
      </Bottom>
    </>
  )
}
