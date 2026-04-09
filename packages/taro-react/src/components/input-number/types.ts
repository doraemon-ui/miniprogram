import type {
  InputNumberProps as NativeInputNumberProps,
  InputNumberExpose as NativeInputNumberExpose,
} from '@doraemon-ui/miniprogram.input-number'
import type { BasicComponent } from '@/types'

export interface InputNumberProps extends NativeInputNumberProps, BasicComponent {}

export interface InputNumberExpose extends NativeInputNumberExpose {}
