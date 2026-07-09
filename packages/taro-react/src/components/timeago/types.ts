import type { TimeagoExpose as NativeTimeagoExpose, TimeagoProps as NativeTimeagoProps } from '@doraemon-ui/miniprogram.timeago'

import type { BasicComponent } from '../../types'

export interface TimeagoProps extends NativeTimeagoProps, BasicComponent {}

export interface TimeagoExpose extends NativeTimeagoExpose {}
