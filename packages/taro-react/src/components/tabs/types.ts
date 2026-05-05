import type { TabsProps as NativeTabsProps, TabsExpose as NativeTabsExpose } from '@doraemon-ui/miniprogram.tabs'
import type { BasicComponent } from '../../types'

export interface TabsProps extends NativeTabsProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface TabsExpose extends NativeTabsExpose {}
