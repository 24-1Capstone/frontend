'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { format, isPast, isWeekend, isToday } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Control, FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calcEndTime, combineDateTime } from '@/lib/date'
import { createReservation } from '@/api/reserve'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ReserveFormSchema } from '@/schemas/reserve-form-schema'

function DateSelectField({
  control,
}: {
  control?: Control<
    { date: Date; time: string; message?: string | undefined },
    any
  >
}) {
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>날짜 선택</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP', { locale: ko })
                  ) : (
                    <span>날짜를 선택해 주세요.</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={ko}
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  (isPast(date) && !isToday(date)) || isWeekend(date)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function TimeSelectField({
  control,
}: {
  control?: Control<
    { date: Date; time: string; message?: string | undefined },
    any
  >
}) {
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>시간 선택</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(!field.value && 'text-muted-foreground')}
              >
                <SelectValue placeholder="시간을 선택해주세요." />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="h-36">
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="12:00">12:00</SelectItem>
              <SelectItem value="13:00">13:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
              <SelectItem value="17:00">17:00</SelectItem>
              <SelectItem value="18:00">18:00</SelectItem>
              <SelectItem value="19:00">19:00</SelectItem>
              <SelectItem value="20:00">20:00</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function MessageInputField({
  control,
}: {
  control?: Control<
    { date: Date; time: string; message?: string | undefined },
    any
  >
}) {
  return (
    <FormField
      control={control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>메시지</FormLabel>
          <FormControl>
            <Textarea
              placeholder="자기소개나 대화 주제 등 간단한 메시지를 남겨보세요!"
              maxLength={160}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function ReserveForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const form = useForm<z.infer<typeof ReserveFormSchema>>({
    resolver: zodResolver(ReserveFormSchema),
  })

  const onSubmit = async (data: z.infer<typeof ReserveFormSchema>) => {
    const content = data.message ?? ''
    const startTime = combineDateTime(data.date, data.time)
    const endTime = calcEndTime(startTime)
    const receiveUsername = username!

    try {
      const response = await createReservation(
        content,
        startTime,
        endTime,
        receiveUsername,
      )

      if (response === 200) {
        alert('신청이 완료되었습니다.')
        router.push('/my-chat')
      }
    } catch (error) {
      alert(`신청에 실패했습니다. 다시 시도해주세요. ${error}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <DateSelectField control={form.control} />
        <TimeSelectField control={form.control} />
        <MessageInputField control={form.control} />
        <Button type="submit" size="lg" className="w-full">
          신청하기
        </Button>
      </form>
    </Form>
  )
}

export { ReserveForm }
