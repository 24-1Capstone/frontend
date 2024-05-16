import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserType } from '@/types/user'

function UserCard({ user }: { user: UserType }) {
  return (
    <Link
      href={`/home/details?user=${user.login}`}
      className="flex gap-6 rounded-xl p-4 transition hover:bg-foreground/5"
    >
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.avatar_url} draggable={false} />
        <AvatarFallback>{user.login}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center gap-2">
        <span className="font-medium">{user.login}</span>
      </div>
    </Link>
  )
}

export { UserCard }
