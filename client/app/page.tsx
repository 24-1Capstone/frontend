import Link from 'next/link'
import { GitHub } from 'react-feather'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <main className="flex-1"></main>
      <div className="sticky bottom-0 bg-background p-4">
        <Button size="lg" className="w-full" asChild>
          <Link
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
          >
            <GitHub className="mr-2 h-4 w-4" />
            GitHub으로 계속하기
          </Link>
        </Button>
      </div>
    </>
  )
}
