import type { ButtonProps as NativeButtonProps, ButtonExpose as NativeButtonExpose } from '@doraemon-ui/miniprogram.button'
import type { BasicComponent } from '@/types'

export interface ButtonProps extends NativeButtonProps, BasicComponent {}

export interface ButtonExpose extends NativeButtonExpose {}
