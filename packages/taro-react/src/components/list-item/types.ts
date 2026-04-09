import type { ListItemProps as NativeListItemProps, ListItemExpose as NativeListItemExpose } from '@doraemon-ui/miniprogram.list'
import type { BasicComponent } from '@/types'

export interface ListItemProps extends NativeListItemProps, BasicComponent {}

export interface ListItemExpose extends NativeListItemExpose {}
