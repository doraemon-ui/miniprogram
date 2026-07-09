import type { ToastExpose as NativeToastExpose, ToastProps as NativeToastProps } from '@doraemon-ui/miniprogram.toast'

import type { BasicComponent } from '../../types'

export interface ToastProps extends NativeToastProps, BasicComponent {
  onClose?: (event: any) => void
  onClosed?: (event: any) => void
}

export interface ToastExpose extends NativeToastExpose {}
