import type { VirtualListExpose as NativeVirtualListExpose, VirtualListProps as NativeVirtualListProps } from '@doraemon-ui/miniprogram.virtual-list'

import type { BasicComponent } from '../../types'

export interface VirtualListProps extends NativeVirtualListProps, BasicComponent {
  onChange?: (event: any) => void
  onScroll?: (event: any) => void
  onScrolltoupper?: (event: any) => void
  onScrolltolower?: (event: any) => void
}

export interface VirtualListExpose extends NativeVirtualListExpose {}
