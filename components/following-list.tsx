'use client'

import { useMyFollowing } from '@/hooks/queries/use-my-following'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserCard } from '@/components/user-card'

function FollowingList() {
  const { data: following } = useMyFollowing()

  return (
    <ScrollArea className="flex max-h-[calc(100dvh-216px)] flex-col gap-4">
      {following?.map((user) => (
        <UserCard key={`following-${user.id}`} user={user} />
      ))}
    </ScrollArea>
  )
}

export { FollowingList }
