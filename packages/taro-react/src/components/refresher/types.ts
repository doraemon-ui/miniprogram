import type { RefresherProps as NativeRefresherProps, RefresherExpose as NativeRefresherExpose } from '@doraemon-ui/miniprogram.refresher'
import type { BasicComponent } from '@/types'

export interface RefresherProps extends NativeRefresherProps, BasicComponent {}

export interface RefresherExpose extends NativeRefresherExpose {}
