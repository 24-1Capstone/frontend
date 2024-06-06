import { z } from 'zod'

export const ReserveFormSchema = z.object({
  date: z.date({ required_error: '날짜를 선택해주세요' }),
  time: z.string({ required_error: '시간을 선택해주세요' }),
  message: z
    .string()
    .max(160, {
      message: '메시지는 최대 160자까지 입력 가능합니다.',
    })
    .optional(),
})
