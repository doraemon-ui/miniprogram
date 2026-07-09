import type { InputExpose as NativeInputExpose, InputProps as NativeInputProps } from '@doraemon-ui/miniprogram.input'

import type { BasicComponent } from '../../types'

export interface InputProps extends NativeInputProps, BasicComponent {
  onChange?: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  onConfirm?: (event: any) => void
  onKeyboardheightchange?: (event: any) => void
  onNicknamereview?: (event: any) => void
  onClear?: (event: any) => void
  onError?: (event: any) => void
}

export interface InputExpose extends NativeInputExpose {}
