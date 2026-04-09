import type { FormProps as NativeFormProps, FormExpose as NativeFormExpose } from '@doraemon-ui/miniprogram.form'
import type { BasicComponent } from '@/types'

export interface FormProps extends NativeFormProps, BasicComponent {}

export interface FormExpose extends NativeFormExpose {}
