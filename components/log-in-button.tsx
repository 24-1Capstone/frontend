import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

function LogInButton() {
  return (
    <Button size="lg" className="w-full" asChild>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/github`}
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub으로 계속하기....
      </Link>
    </Button>
  )
}

export { LogInButton }
