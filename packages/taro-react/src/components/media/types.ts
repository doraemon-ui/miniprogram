import type { MediaProps as NativeMediaProps, MediaExpose as NativeMediaExpose } from '@doraemon-ui/miniprogram.media'
import type { BasicComponent } from '@/types'

export interface MediaProps extends NativeMediaProps, BasicComponent {}

export interface MediaExpose extends NativeMediaExpose {}
