import { Bottom, Main, Top } from '@/components/layout'
import { SignInButton } from '@/components/sign-in-button'
import Logo from '@/assets/svgs/logo.svg'

export default function Landing() {
  return (
    <>
      <Top className="p-4"></Top>
      <Main className="flex flex-col items-center justify-center gap-4 p-4">
        <Logo className="h-32 w-32 transition-all sm:h-48 sm:w-48" />
        <h1 className="text-4xl font-extrabold transition-all sm:text-6xl">
          ChatHub
        </h1>
      </Main>
      <Bottom className="p-4">
        <SignInButton />
      </Bottom>
    </>
  )
}
