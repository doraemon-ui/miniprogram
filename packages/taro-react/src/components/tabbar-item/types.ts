import type { TabbarItemProps as NativeTabbarItemProps, TabbarItemExpose as NativeTabbarItemExpose } from '@doraemon-ui/miniprogram.tabbar'
import type { BasicComponent } from '../../types'

export interface TabbarItemProps extends NativeTabbarItemProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface TabbarItemExpose extends NativeTabbarItemExpose {}
