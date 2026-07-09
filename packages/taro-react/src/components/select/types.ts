import type { SelectExpose as NativeSelectExpose, SelectProps as NativeSelectProps } from '@doraemon-ui/miniprogram.select'

import type { BasicComponent } from '../../types'

export interface SelectProps extends NativeSelectProps, BasicComponent {}

export interface SelectExpose extends NativeSelectExpose {}
