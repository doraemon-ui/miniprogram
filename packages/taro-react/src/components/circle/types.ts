import type { CircleProps as NativeCircleProps, CircleExpose as NativeCircleExpose } from '@doraemon-ui/miniprogram.circle'
import type { BasicComponent } from '@/types'

export interface CircleProps extends NativeCircleProps, BasicComponent {}

export interface CircleExpose extends NativeCircleExpose {}
