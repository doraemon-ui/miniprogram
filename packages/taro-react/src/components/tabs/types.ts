import type { TabsProps as NativeTabsProps, TabsExpose as NativeTabsExpose } from '@doraemon-ui/miniprogram.tabs'
import type { BasicComponent } from '@/types'

export interface TabsProps extends NativeTabsProps, BasicComponent {}

export interface TabsExpose extends NativeTabsExpose {}
