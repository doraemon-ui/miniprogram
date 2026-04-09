import type {
  AnimationGroupProps as NativeAnimationGroupProps,
  AnimationGroupExpose as NativeAnimationGroupExpose,
} from '@doraemon-ui/miniprogram.animation-group'
import type { BasicComponent } from '@/types'

export interface AnimationGroupProps extends NativeAnimationGroupProps, BasicComponent {}

export interface AnimationGroupExpose extends NativeAnimationGroupExpose {}
