import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FollowersList } from '@/components/followers-list'
import { FollowingList } from '@/components/following-list'

export default function Page() {
  return (
    <Tabs defaultValue="followers">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="followers" className="w-1/2">
          팔로워
        </TabsTrigger>
        <TabsTrigger value="following" className="w-1/2">
          팔로잉
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followers">
        <FollowersList />
      </TabsContent>
      <TabsContent value="following">
        <FollowingList />
      </TabsContent>
    </Tabs>
  )
}
