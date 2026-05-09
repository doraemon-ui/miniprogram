import type { GridItemProps as NativeGridItemProps, GridItemExpose as NativeGridItemExpose } from '@doraemon-ui/miniprogram.grid'
import type { BasicComponent } from '../../types'

export interface GridItemProps extends NativeGridItemProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface GridItemExpose extends NativeGridItemExpose {}
