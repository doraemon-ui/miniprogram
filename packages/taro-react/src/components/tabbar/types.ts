import type { TabbarExpose as NativeTabbarExpose, TabbarProps as NativeTabbarProps } from '@doraemon-ui/miniprogram.tabbar'

import type { BasicComponent } from '../../types'

export interface TabbarProps extends NativeTabbarProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface TabbarExpose extends NativeTabbarExpose {}
