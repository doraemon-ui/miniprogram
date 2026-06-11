import type { IndexListProps as NativeIndexListProps, IndexListExpose as NativeIndexListExpose } from '@doraemon-ui/miniprogram.index-list'
import type { BasicComponent } from '../../types'

export interface IndexListProps extends NativeIndexListProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface IndexListExpose extends NativeIndexListExpose {}
