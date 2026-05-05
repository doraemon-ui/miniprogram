import type { CascaderPickerViewProps as NativeCascaderPickerViewProps, CascaderPickerViewExpose as NativeCascaderPickerViewExpose } from '@doraemon-ui/miniprogram.cascader-picker-view'
import type { BasicComponent } from '../../types'

export interface CascaderPickerViewProps extends NativeCascaderPickerViewProps, BasicComponent {
  onValueChange?: (event: any) => void
}

export interface CascaderPickerViewExpose extends NativeCascaderPickerViewExpose {}
