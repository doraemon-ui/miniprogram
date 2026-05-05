import type { ToastProps as NativeToastProps, ToastExpose as NativeToastExpose } from '@doraemon-ui/miniprogram.toast'
import type { BasicComponent } from '../../types'

export interface ToastProps extends NativeToastProps, BasicComponent {
  onClose?: (event: any) => void
  onClosed?: (event: any) => void
}

export interface ToastExpose extends NativeToastExpose {}
