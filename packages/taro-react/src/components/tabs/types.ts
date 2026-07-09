import type { TabsExpose as NativeTabsExpose, TabsProps as NativeTabsProps } from '@doraemon-ui/miniprogram.tabs'

import type { BasicComponent } from '../../types'

export interface TabsProps extends NativeTabsProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface TabsExpose extends NativeTabsExpose {}
