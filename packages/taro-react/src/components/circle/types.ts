import type { CircleExpose as NativeCircleExpose, CircleProps as NativeCircleProps } from '@doraemon-ui/miniprogram.circle'

import type { BasicComponent } from '../../types'

export interface CircleProps extends NativeCircleProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface CircleExpose extends NativeCircleExpose {}
