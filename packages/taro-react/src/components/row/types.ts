import type { RowExpose as NativeRowExpose, RowProps as NativeRowProps } from '@doraemon-ui/miniprogram.layout'

import type { BasicComponent } from '../../types'

export interface RowProps extends NativeRowProps, BasicComponent {}

export interface RowExpose extends NativeRowExpose {}
