'use client'

import { useMyFollowers } from '@/hooks/queries/use-my-followers'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserCard } from '@/components/user-card'

function FollowersList() {
  const { data: followers } = useMyFollowers()

  return (
    <ScrollArea className="flex max-h-[calc(100dvh-216px)] flex-col gap-4">
      {followers?.map((user) => (
        <UserCard key={`follower-${user.id}`} user={user} />
      ))}
    </ScrollArea>
  )
}

export { FollowersList }
