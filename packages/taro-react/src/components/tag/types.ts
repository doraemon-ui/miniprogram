import type { TagExpose as NativeTagExpose, TagProps as NativeTagProps } from '@doraemon-ui/miniprogram.tag'

import type { BasicComponent } from '../../types'

export interface TagProps extends NativeTagProps, BasicComponent {
  onChange?: (event: any) => void
  onClick?: (event: any) => void
  onClose?: (event: any) => void
}

export interface TagExpose extends NativeTagExpose {}
