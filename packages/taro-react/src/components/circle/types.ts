import type { CircleProps as NativeCircleProps, CircleExpose as NativeCircleExpose } from '@doraemon-ui/miniprogram.circle'
import type { BasicComponent } from '../../types'

export interface CircleProps extends NativeCircleProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface CircleExpose extends NativeCircleExpose {}
