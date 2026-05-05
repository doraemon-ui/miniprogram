import type { PickerProps as NativePickerProps, PickerExpose as NativePickerExpose } from '@doraemon-ui/miniprogram.picker'
import type { BasicComponent } from '../../types'

export interface PickerProps extends NativePickerProps, BasicComponent {
  onVisibleChange?: (event: any) => void
  onChange?: (event: any) => void
  onConfirm?: (event: any) => void
  onCancel?: (event: any) => void
  onValueChange?: (event: any) => void
}

export interface PickerExpose extends NativePickerExpose {}
