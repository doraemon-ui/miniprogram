import type { TextareaProps as NativeTextareaProps, TextareaExpose as NativeTextareaExpose } from '@doraemon-ui/miniprogram.textarea'
import type { BasicComponent } from '../../types'

export interface TextareaProps extends NativeTextareaProps, BasicComponent {
  onChange?: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  onConfirm?: (event: any) => void
  onKeyboardheightchange?: (event: any) => void
  onClear?: (event: any) => void
  onError?: (event: any) => void
  onLinechange?: (event: any) => void
}

export interface TextareaExpose extends NativeTextareaExpose {}
