import { ChevronLeft } from 'lucide-react'

import { AppBar, Center, End, Start } from '@/components/ui/app-bar'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@/components/sign-out-button'

function TopAppBar() {
  return (
    <AppBar>
      <Start>
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Start>
      <Center>
        <h2 className="text-xl font-bold">Home</h2>
      </Center>
      <End>
        <SignOutButton />
      </End>
    </AppBar>
  )
}

export { TopAppBar }
