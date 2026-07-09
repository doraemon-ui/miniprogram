import type { DatePickerViewExpose as NativeDatePickerViewExpose, DatePickerViewProps as NativeDatePickerViewProps } from '@doraemon-ui/miniprogram.date-picker-view'

import type { BasicComponent } from '../../types'

export interface DatePickerViewProps extends NativeDatePickerViewProps, BasicComponent {
  onValueChange?: (event: any) => void
}

export interface DatePickerViewExpose extends NativeDatePickerViewExpose {}
