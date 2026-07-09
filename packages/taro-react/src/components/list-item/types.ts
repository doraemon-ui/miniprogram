import type { ListItemExpose as NativeListItemExpose, ListItemProps as NativeListItemProps } from '@doraemon-ui/miniprogram.list'

import type { BasicComponent } from '../../types'

export interface ListItemProps extends NativeListItemProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface ListItemExpose extends NativeListItemExpose {}
