import type { CheckboxProps as NativeCheckboxProps, CheckboxExpose as NativeCheckboxExpose } from '@doraemon-ui/miniprogram.checkbox'
import type { BasicComponent } from '../../types'

export interface CheckboxProps extends NativeCheckboxProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface CheckboxExpose extends NativeCheckboxExpose {}
