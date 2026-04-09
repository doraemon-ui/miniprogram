import type {
  VirtualListProps as NativeVirtualListProps,
  VirtualListExpose as NativeVirtualListExpose,
} from '@doraemon-ui/miniprogram.virtual-list'
import type { BasicComponent } from '@/types'

export interface VirtualListProps extends NativeVirtualListProps, BasicComponent {}

export interface VirtualListExpose extends NativeVirtualListExpose {}
