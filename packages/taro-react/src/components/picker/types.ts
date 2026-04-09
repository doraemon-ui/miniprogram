import type { PickerProps as NativePickerProps, PickerExpose as NativePickerExpose } from '@doraemon-ui/miniprogram.picker'
import type { BasicComponent } from '@/types'

export interface PickerProps extends NativePickerProps, BasicComponent {}

export interface PickerExpose extends NativePickerExpose {}
