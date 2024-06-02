import { addHours, format, set } from 'date-fns'
import { ko } from 'date-fns/locale'

export function combineDateTime(date: Date, time: string): Date {
  const hours = parseInt(time.split(':')[0], 10) + 9
  const minutes = parseInt(time.split(':')[1], 10)

  return set(date, { hours, minutes })
}

export function calcEndTime(date: Date): Date {
  return addHours(date, 1)
}

export function formatDateTime(date: string): string {
  return format(date, 'M월 d일 HH시', { locale: ko })
}
