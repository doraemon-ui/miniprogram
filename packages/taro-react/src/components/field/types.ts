import type { FieldProps as NativeFieldProps, FieldExpose as NativeFieldExpose } from '@doraemon-ui/miniprogram.field'
import type { BasicComponent } from '@/types'

export interface FieldProps extends NativeFieldProps, BasicComponent {}

export interface FieldExpose extends NativeFieldExpose {}
