'use client'

import { useMyFollowing } from '@/hooks/queries/use-my-following'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserCard } from '@/components/user-card'

function FollowingList() {
  const { data: following } = useMyFollowing()

  return (
    <>
      <div className="px-4">
        <span className="text-sm font-medium text-foreground/70">
          총 {following?.length}명
        </span>
      </div>
      <ScrollArea className="mt-2 flex max-h-[calc(100dvh-238px)] flex-col gap-4">
        {following?.map((user) => (
          <UserCard key={`following-${user.id}`} user={user} />
        ))}
      </ScrollArea>
    </>
  )
}

export { FollowingList }
