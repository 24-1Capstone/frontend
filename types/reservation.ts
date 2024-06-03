interface IReservation {
  id: number
  content: string
  createdAt: string
  applyUserName: string
  receiveUserName: string
  startTime: string
  endTime: string
  reservationStatus: 'CONFIRMED' | 'PROGRESSING' | 'REFUSE'
}

export type { IReservation }
