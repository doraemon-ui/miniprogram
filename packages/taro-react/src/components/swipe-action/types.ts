import type {
  SwipeActionProps as NativeSwipeActionProps,
  SwipeActionExpose as NativeSwipeActionExpose,
} from '@doraemon-ui/miniprogram.swipe-action'
import type { BasicComponent } from '@/types'

export interface SwipeActionProps extends NativeSwipeActionProps, BasicComponent {}

export interface SwipeActionExpose extends NativeSwipeActionExpose {}
