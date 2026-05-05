import type { CascaderProps as NativeCascaderProps, CascaderExpose as NativeCascaderExpose } from '@doraemon-ui/miniprogram.cascader'
import type { BasicComponent } from '../../types'

export interface CascaderProps extends NativeCascaderProps, BasicComponent {
  onTabsChange?: (event: any) => void
  onLoad?: (event: any) => void
  onChange?: (event: any) => void
  onClose?: (event: any) => void
  onConfirm?: (event: any) => void
  onCancel?: (event: any) => void
}

export interface CascaderExpose extends NativeCascaderExpose {}
