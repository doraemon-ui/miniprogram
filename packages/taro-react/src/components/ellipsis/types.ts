import type { EllipsisExpose as NativeEllipsisExpose, EllipsisProps as NativeEllipsisProps } from '@doraemon-ui/miniprogram.ellipsis'

import type { BasicComponent } from '../../types'

export interface EllipsisProps extends NativeEllipsisProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface EllipsisExpose extends NativeEllipsisExpose {}
