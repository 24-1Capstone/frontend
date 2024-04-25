import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserType } from '@/types/user'

function UserCard({ user }: { user: UserType }) {
  return (
    <div className="flex gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.avatar_url} draggable={false} />
        <AvatarFallback>{user.login}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <span className="font-medium">{user.login}</span>
      </div>
    </div>
  )
}

export { UserCard }
