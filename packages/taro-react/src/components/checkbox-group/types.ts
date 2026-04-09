import type {
  CheckboxGroupProps as NativeCheckboxGroupProps,
  CheckboxGroupExpose as NativeCheckboxGroupExpose,
} from '@doraemon-ui/miniprogram.checkbox'
import type { BasicComponent } from '@/types'

export interface CheckboxGroupProps extends NativeCheckboxGroupProps, BasicComponent {}

export interface CheckboxGroupExpose extends NativeCheckboxGroupExpose {}
