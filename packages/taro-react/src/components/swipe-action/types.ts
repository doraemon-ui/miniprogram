import type { SwipeActionExpose as NativeSwipeActionExpose, SwipeActionProps as NativeSwipeActionProps } from '@doraemon-ui/miniprogram.swipe-action'

import type { BasicComponent } from '../../types'

export interface SwipeActionProps extends NativeSwipeActionProps, BasicComponent {
  onClick?: (event: any) => void
  onOpen?: (event: any) => void
  onClose?: (event: any) => void
}

export interface SwipeActionExpose extends NativeSwipeActionExpose {}
