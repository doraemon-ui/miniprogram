import type { DatePickerProps as NativeDatePickerProps, DatePickerExpose as NativeDatePickerExpose } from '@doraemon-ui/miniprogram.date-picker'
import type { BasicComponent } from '../../types'

export interface DatePickerProps extends NativeDatePickerProps, BasicComponent {
  onVisibleChange?: (event: any) => void
  onChange?: (event: any) => void
  onConfirm?: (event: any) => void
  onCancel?: (event: any) => void
  onValueChange?: (event: any) => void
}

export interface DatePickerExpose extends NativeDatePickerExpose {}
