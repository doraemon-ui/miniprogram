import type {
  CascaderViewProps as NativeCascaderViewProps,
  CascaderViewExpose as NativeCascaderViewExpose,
} from '@doraemon-ui/miniprogram.cascader-view'
import type { BasicComponent } from '@/types'

export interface CascaderViewProps extends NativeCascaderViewProps, BasicComponent {}

export interface CascaderViewExpose extends NativeCascaderViewExpose {}
