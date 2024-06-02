import { AppliedReservationsList } from '@/components/applied-reservations-list'
import { ReceivedReservationsList } from '@/components/received-reservations-list'

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <h3 className="text-2xl font-bold">내가 신청한 커피챗</h3>
      <AppliedReservationsList />
      <h3 className="mt-8 text-2xl font-bold">내가 신청받은 커피챗</h3>
      <ReceivedReservationsList />
    </div>
  )
}
