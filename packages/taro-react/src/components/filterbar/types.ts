import type { FilterbarProps as NativeFilterbarProps, FilterbarExpose as NativeFilterbarExpose } from '@doraemon-ui/miniprogram.filterbar'
import type { BasicComponent } from '../../types'

export interface FilterbarProps extends NativeFilterbarProps, BasicComponent {
  onChange?: (event: any) => void
  onScroll?: (event: any) => void
  onOpen?: (event: any) => void
  onClose?: (event: any) => void
}

export interface FilterbarExpose extends NativeFilterbarExpose {}
