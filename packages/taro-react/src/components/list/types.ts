import type { ListProps as NativeListProps, ListExpose as NativeListExpose } from '@doraemon-ui/miniprogram.list'
import type { BasicComponent } from '@/types'

export interface ListProps extends NativeListProps, BasicComponent {}

export interface ListExpose extends NativeListExpose {}
