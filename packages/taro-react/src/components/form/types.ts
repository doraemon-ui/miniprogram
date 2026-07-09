import type { FormExpose as NativeFormExpose, FormProps as NativeFormProps } from '@doraemon-ui/miniprogram.form'

import type { BasicComponent } from '../../types'

export interface FormProps extends NativeFormProps, BasicComponent {
  onChange?: (event: any) => void
  onFieldsChange?: (event: any) => void
}

export interface FormExpose extends NativeFormExpose {}
