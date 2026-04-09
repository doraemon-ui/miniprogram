import type {
  DatePickerProps as NativeDatePickerProps,
  DatePickerExpose as NativeDatePickerExpose,
} from '@doraemon-ui/miniprogram.date-picker'
import type { BasicComponent } from '@/types'

export interface DatePickerProps extends NativeDatePickerProps, BasicComponent {}

export interface DatePickerExpose extends NativeDatePickerExpose {}
