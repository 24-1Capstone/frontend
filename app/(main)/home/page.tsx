'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserCard } from '@/components/user-card'
import { useUserFollowers } from '@/hooks/queries/use-user-followers'
import { useUserFollowing } from '@/hooks/queries/use-user-following'

export default function Home() {
  const { data: followers } = useUserFollowers()
  const { data: following } = useUserFollowing()

  return (
    <Tabs defaultValue="followers">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="followers" className="w-1/2">
          팔로워 ({followers?.length})
        </TabsTrigger>
        <TabsTrigger value="following" className="w-1/2">
          팔로잉 ({following?.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followers">
        <ScrollArea>
          <div className="flex flex-col gap-8">
            {followers?.map((user) => (
              <UserCard key={`follower-${user.id}`} user={user} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="following">
        <ScrollArea>
          <div className="flex flex-col gap-8">
            {following?.map((user) => (
              <UserCard key={`following-${user.id}`} user={user} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
