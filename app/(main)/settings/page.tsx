import { DeleteAccountButton } from '@/components/delete-account-button'
import { LogOutButton } from '@/components/logout-button'

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">계정</h3>
      <LogOutButton />
      <DeleteAccountButton />
    </div>
  )
}
