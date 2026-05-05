import type { IconProps as NativeIconProps, IconExpose as NativeIconExpose } from '@doraemon-ui/miniprogram.icon'
import type { BasicComponent } from '../../types'

export interface IconProps extends NativeIconProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface IconExpose extends NativeIconExpose {}
