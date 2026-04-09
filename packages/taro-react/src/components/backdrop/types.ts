import type { BackdropProps as NativeBackdropProps, BackdropExpose as NativeBackdropExpose } from '@doraemon-ui/miniprogram.backdrop'
import type { BasicComponent } from '@/types'

export interface BackdropProps extends NativeBackdropProps, BasicComponent {}

export interface BackdropExpose extends NativeBackdropExpose {}
