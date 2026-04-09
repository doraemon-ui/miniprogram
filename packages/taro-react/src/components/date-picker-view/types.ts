import type {
  DatePickerViewProps as NativeDatePickerViewProps,
  DatePickerViewExpose as NativeDatePickerViewExpose,
} from '@doraemon-ui/miniprogram.date-picker-view'
import type { BasicComponent } from '@/types'

export interface DatePickerViewProps extends NativeDatePickerViewProps, BasicComponent {}

export interface DatePickerViewExpose extends NativeDatePickerViewExpose {}
