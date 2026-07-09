import type { MediaExpose as NativeMediaExpose, MediaProps as NativeMediaProps } from '@doraemon-ui/miniprogram.media'

import type { BasicComponent } from '../../types'

export interface MediaProps extends NativeMediaProps, BasicComponent {}

export interface MediaExpose extends NativeMediaExpose {}
