import type { FilterbarProps as NativeFilterbarProps, FilterbarExpose as NativeFilterbarExpose } from '@doraemon-ui/miniprogram.filterbar'
import type { BasicComponent } from '@/types'

export interface FilterbarProps extends NativeFilterbarProps, BasicComponent {}

export interface FilterbarExpose extends NativeFilterbarExpose {}
