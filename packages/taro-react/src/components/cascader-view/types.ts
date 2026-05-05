import type { CascaderViewProps as NativeCascaderViewProps, CascaderViewExpose as NativeCascaderViewExpose } from '@doraemon-ui/miniprogram.cascader-view'
import type { BasicComponent } from '../../types'

export interface CascaderViewProps extends NativeCascaderViewProps, BasicComponent {
  onTabsChange?: (event: any) => void
  onChange?: (event: any) => void
  onLoad?: (event: any) => void
}

export interface CascaderViewExpose extends NativeCascaderViewExpose {}
