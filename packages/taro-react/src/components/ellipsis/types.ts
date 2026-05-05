import type { EllipsisProps as NativeEllipsisProps, EllipsisExpose as NativeEllipsisExpose } from '@doraemon-ui/miniprogram.ellipsis'
import type { BasicComponent } from '../../types'

export interface EllipsisProps extends NativeEllipsisProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface EllipsisExpose extends NativeEllipsisExpose {}
