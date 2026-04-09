import type { NavbarProps as NativeNavbarProps, NavbarExpose as NativeNavbarExpose } from '@doraemon-ui/miniprogram.navbar'
import type { BasicComponent } from '@/types'

export interface NavbarProps extends NativeNavbarProps, BasicComponent {}

export interface NavbarExpose extends NativeNavbarExpose {}
