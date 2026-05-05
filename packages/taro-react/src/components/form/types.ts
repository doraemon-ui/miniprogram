import type { FormProps as NativeFormProps, FormExpose as NativeFormExpose } from '@doraemon-ui/miniprogram.form'
import type { BasicComponent } from '../../types'

export interface FormProps extends NativeFormProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface FormExpose extends NativeFormExpose {}
