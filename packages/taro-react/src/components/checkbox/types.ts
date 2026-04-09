import type { CheckboxProps as NativeCheckboxProps, CheckboxExpose as NativeCheckboxExpose } from '@doraemon-ui/miniprogram.checkbox'
import type { BasicComponent } from '@/types'

export interface CheckboxProps extends NativeCheckboxProps, BasicComponent {}

export interface CheckboxExpose extends NativeCheckboxExpose {}
