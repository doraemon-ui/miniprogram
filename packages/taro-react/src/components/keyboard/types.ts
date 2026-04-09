import type { KeyboardProps as NativeKeyboardProps, KeyboardExpose as NativeKeyboardExpose } from '@doraemon-ui/miniprogram.keyboard'
import type { BasicComponent } from '@/types'

export interface KeyboardProps extends NativeKeyboardProps, BasicComponent {}

export interface KeyboardExpose extends NativeKeyboardExpose {}
