import type { SelectProps as NativeSelectProps, SelectExpose as NativeSelectExpose } from '@doraemon-ui/miniprogram.select'
import type { BasicComponent } from '@/types'

export interface SelectProps extends NativeSelectProps, BasicComponent {}

export interface SelectExpose extends NativeSelectExpose {}
