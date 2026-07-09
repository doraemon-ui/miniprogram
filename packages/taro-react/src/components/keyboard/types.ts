import type { KeyboardExpose as NativeKeyboardExpose, KeyboardProps as NativeKeyboardProps } from '@doraemon-ui/miniprogram.keyboard'

import type { BasicComponent } from '../../types'

export interface KeyboardProps extends NativeKeyboardProps, BasicComponent {}

export interface KeyboardExpose extends NativeKeyboardExpose {}
