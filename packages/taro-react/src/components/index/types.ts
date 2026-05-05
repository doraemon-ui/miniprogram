import type { IndexProps as NativeIndexProps, IndexExpose as NativeIndexExpose } from '@doraemon-ui/miniprogram.index'
import type { BasicComponent } from '../../types'

export interface IndexProps extends NativeIndexProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface IndexExpose extends NativeIndexExpose {}
