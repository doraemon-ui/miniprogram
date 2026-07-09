import type { AnimationGroupExpose as NativeAnimationGroupExpose, AnimationGroupProps as NativeAnimationGroupProps } from '@doraemon-ui/miniprogram.animation-group'

import type { BasicComponent } from '../../types'

export interface AnimationGroupProps extends NativeAnimationGroupProps, BasicComponent {
  onChange?: (event: any) => void
  onClick?: (event: any) => void
}

export interface AnimationGroupExpose extends NativeAnimationGroupExpose {}
