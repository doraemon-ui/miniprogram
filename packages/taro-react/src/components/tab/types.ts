import type { TabProps as NativeTabProps, TabExpose as NativeTabExpose } from '@doraemon-ui/miniprogram.tabs'
import type { BasicComponent } from '@/types'

export interface TabProps extends NativeTabProps, BasicComponent {}

export interface TabExpose extends NativeTabExpose {}
