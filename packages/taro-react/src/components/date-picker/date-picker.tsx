import { createHostComponent } from '@/hooks/hostComponent'
import type { DatePickerProps, DatePickerExpose } from './types'

export const DatePicker = createHostComponent<DatePickerProps, DatePickerExpose>('dora-date-picker')

DatePicker.displayName = 'DoraDatePicker'
