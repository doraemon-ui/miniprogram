import type { FieldExpose as NativeFieldExpose, FieldProps as NativeFieldProps } from '@doraemon-ui/miniprogram.form'

import type { BasicComponent } from '../../types'

export interface FieldProps extends NativeFieldProps, BasicComponent {}

export interface FieldExpose extends NativeFieldExpose {}
