import type { PickerViewExpose as NativePickerViewExpose, PickerViewProps as NativePickerViewProps } from '@doraemon-ui/miniprogram.picker-view'

import type { BasicComponent } from '../../types'

export interface PickerViewProps extends NativePickerViewProps, BasicComponent {
  onValueChange?: (event: any) => void
  onBeforeChange?: (event: any) => void
}

export interface PickerViewExpose extends NativePickerViewExpose {}
