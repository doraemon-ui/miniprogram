import type { TabProps as NativeTabProps, TabExpose as NativeTabExpose } from '@doraemon-ui/miniprogram.tabs'
import type { BasicComponent } from '../../types'

export interface TabProps extends NativeTabProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface TabExpose extends NativeTabExpose {}
