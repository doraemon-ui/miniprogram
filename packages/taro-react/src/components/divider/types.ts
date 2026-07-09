import type { DividerExpose as NativeDividerExpose, DividerProps as NativeDividerProps } from '@doraemon-ui/miniprogram.divider'

import type { BasicComponent } from '../../types'

export interface DividerProps extends NativeDividerProps, BasicComponent {}

export interface DividerExpose extends NativeDividerExpose {}
