import type { DialogProps as NativeDialogProps, DialogExpose as NativeDialogExpose } from '@doraemon-ui/miniprogram.dialog'
import type { BasicComponent } from '@/types'

export interface DialogProps extends NativeDialogProps, BasicComponent {}

export interface DialogExpose extends NativeDialogExpose {}
