import Link from 'next/link'
import { GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { IProfile } from '@/types/profile'

function Profile({ user }: { user?: IProfile }) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 font-medium">
      <Avatar className="h-52 w-52">
        <AvatarImage src={user?.avatar_url} draggable={false} />
        <AvatarFallback>{user?.login}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold">{user?.name}</h3>
        <span className="text-xl text-foreground/50">{user?.login}</span>
      </div>
      {user?.bio && <p className="text-xl">{user.bio}</p>}
      <Separator />
      <div className="flex flex-col items-center gap-2 text-foreground/70">
        <div className="flex gap-4">
          <span>팔로워: {user?.followers}</span>
          <span>팔로잉: {user?.following}</span>
        </div>
        {user?.company && <span>회사: {user.company}</span>}
        {user?.location && <span>위치: {user.location}</span>}
        {user?.email && <span>이메일: {user.email}</span>}
        {user?.hireable && <span>구직여부: 구직중</span>}
      </div>
      <div className="flex gap-4">
        {user?.html_url && (
          <Link
            className={buttonVariants({ size: 'icon' })}
            href={user.html_url}
            target="_blank"
          >
            <GithubIcon />
          </Link>
        )}
        {user?.blog && (
          <Link
            className={buttonVariants({ size: 'icon' })}
            href={user.blog}
            target="_blank"
          >
            <GlobeIcon />
          </Link>
        )}
        {user?.twitter_username && (
          <Link
            className={buttonVariants({ size: 'icon' })}
            href={user.twitter_username}
            target="_blank"
          >
            <TwitterIcon />
          </Link>
        )}
      </div>
    </div>
  )
}

export { Profile }
