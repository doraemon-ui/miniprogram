import type { IndexListItemExpose as NativeIndexListItemExpose, IndexListItemProps as NativeIndexListItemProps } from '@doraemon-ui/miniprogram.index-list'

import type { BasicComponent } from '../../types'

export interface IndexListItemProps extends NativeIndexListItemProps, BasicComponent {}

export interface IndexListItemExpose extends NativeIndexListItemExpose {}
