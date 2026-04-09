import { createHostComponent } from '@/hooks/hostComponent'
import type { DatePickerViewProps, DatePickerViewExpose } from './types'

export const DatePickerView = createHostComponent<DatePickerViewProps, DatePickerViewExpose>('dora-date-picker-view')

DatePickerView.displayName = 'DoraDatePickerView'
