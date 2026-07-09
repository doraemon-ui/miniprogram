import type { DialogExpose as NativeDialogExpose, DialogProps as NativeDialogProps } from '@doraemon-ui/miniprogram.dialog'

import type { BasicComponent } from '../../types'

export interface DialogProps extends NativeDialogProps, BasicComponent {
  onClose?: (event: any) => void
  onClosed?: (event: any) => void
  onAction?: (event: any) => void
}

export interface DialogExpose extends NativeDialogExpose {}
