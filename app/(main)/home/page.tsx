import { getUserInfo } from '@/api/user'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <Tabs defaultValue="followers">
      <TabsList className="w-full">
        <TabsTrigger value="followers" className="w-1/2">
          팔로워
        </TabsTrigger>
        <TabsTrigger value="following" className="w-1/2">
          팔로잉
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followers"></TabsContent>
      <TabsContent value="following">Following content</TabsContent>
    </Tabs>
  )
}
