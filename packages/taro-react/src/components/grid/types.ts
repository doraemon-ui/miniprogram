import type { GridProps as NativeGridProps, GridExpose as NativeGridExpose } from '@doraemon-ui/miniprogram.grid'
import type { BasicComponent } from '@/types'

export interface GridProps extends NativeGridProps, BasicComponent {}

export interface GridExpose extends NativeGridExpose {}
