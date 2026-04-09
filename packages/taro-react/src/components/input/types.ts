import type { InputProps as NativeInputProps, InputExpose as NativeInputExpose } from '@doraemon-ui/miniprogram.input'
import type { BasicComponent } from '@/types'

export interface InputProps extends NativeInputProps, BasicComponent {}

export interface InputExpose extends NativeInputExpose {}
