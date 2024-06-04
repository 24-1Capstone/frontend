'use client'

import { useMyFollowers } from '@/hooks/queries/use-my-followers'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserCard } from '@/components/user-card'

function FollowersList() {
  const { data: followers } = useMyFollowers()

  return (
    <>
      <div className="px-4">
        <span className="text-sm font-medium text-foreground/70">
          총 {followers?.length}명
        </span>
      </div>
      <ScrollArea className="mt-2 flex max-h-[calc(100dvh-238px)] flex-col gap-4">
        {followers?.map((user) => (
          <UserCard key={`follower-${user.id}`} user={user} />
        ))}
      </ScrollArea>
    </>
  )
}

export { FollowersList }
