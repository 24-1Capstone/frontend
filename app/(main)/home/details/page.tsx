'use client'

import { useSearchParams } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserInfo } from '@/hooks/queries/use-user-info'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function UserProfile() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const { data } = useUserInfo(username ?? '')
  const user = data?.[0]

  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-52 w-52">
        <AvatarImage src={user?.avatar_url} draggable={false} />
        <AvatarFallback>{user?.login}</AvatarFallback>
      </Avatar>
      <h3>{user?.name}</h3>
      <span>{user?.login}</span>
      <p>{user?.bio}</p>
      <div className="flex gap-4">
        <span>팔로워: {user?.followers}</span>
        <span>팔로잉: {user?.following}</span>
      </div>
      {user?.email && <span>이메일: {user.email}</span>}
      <span>{user?.hireable}</span>
      <span>{user?.company}</span>
      <span>{user?.location}</span>
      {user?.html_url && (
        <Link className={buttonVariants()} href={user.html_url || ''}>
          깃허브
        </Link>
      )}
      {user?.blog && (
        <Link className={buttonVariants()} href={user.blog || ''}>
          블로그
        </Link>
      )}
      {user?.twitter_username && (
        <Link className={buttonVariants()} href={user.twitter_username || ''}>
          트위터
        </Link>
      )}
    </div>
  )
}
