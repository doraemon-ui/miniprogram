import type { NavbarExpose as NativeNavbarExpose, NavbarProps as NativeNavbarProps } from '@doraemon-ui/miniprogram.navbar'

import type { BasicComponent } from '../../types'

export interface NavbarProps extends NativeNavbarProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface NavbarExpose extends NativeNavbarExpose {}
