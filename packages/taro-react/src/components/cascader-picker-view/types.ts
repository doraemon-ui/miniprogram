import type {
  CascaderPickerViewProps as NativeCascaderPickerViewProps,
  CascaderPickerViewExpose as NativeCascaderPickerViewExpose,
} from '@doraemon-ui/miniprogram.cascader-picker-view'
import type { BasicComponent } from '@/types'

export interface CascaderPickerViewProps extends NativeCascaderPickerViewProps, BasicComponent {}

export interface CascaderPickerViewExpose extends NativeCascaderPickerViewExpose {}
