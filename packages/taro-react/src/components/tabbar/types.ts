import type { TabbarProps as NativeTabbarProps, TabbarExpose as NativeTabbarExpose } from '@doraemon-ui/miniprogram.tabbar'
import type { BasicComponent } from '@/types'

export interface TabbarProps extends NativeTabbarProps, BasicComponent {}

export interface TabbarExpose extends NativeTabbarExpose {}
