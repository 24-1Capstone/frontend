'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { format, isPast, isWeekend } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calcEndTime, combineDateTime } from '@/lib/date'
import { useUserInfo } from '@/hooks/queries/use-user-info'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createReservation } from '@/api/reserve'

const FormSchema = z.object({
  date: z.date({ required_error: '날짜를 선택해주세요' }),
  time: z.string({ required_error: '시간을 선택해주세요' }),
  message: z
    .string()
    .max(160, {
      message: '메시지는 최대 160자까지 입력 가능합니다.',
    })
    .optional(),
})

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('user')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { data: userInfo, isLoading } = useUserInfo(username ?? '')

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
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
    <div className="flex flex-col items-center gap-6">
      <div className="my-8 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={userInfo?.[0].avatar_url} draggable={false} />
          <AvatarFallback>{userInfo?.[0].login}</AvatarFallback>
        </Avatar>
        <p>
          <span className="font-semibold">
            {userInfo?.[0].name}({userInfo?.[0].login})
          </span>
          님께
          <br />
          커피챗을 신청합니다.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
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
                      disabled={(date) => isPast(date) || isWeekend(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시간 선택</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>메시지</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="자기소개 또는 대화 주제 등 간단한 메시지를 남겨보세요!"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            신청하기
          </Button>
        </form>
      </Form>
    </div>
  )
}
