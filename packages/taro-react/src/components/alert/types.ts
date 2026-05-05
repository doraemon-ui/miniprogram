import type { AlertProps as NativeAlertProps, AlertExpose as NativeAlertExpose } from '@doraemon-ui/miniprogram.alert'
import type { BasicComponent } from '../../types'

export interface AlertProps extends NativeAlertProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface AlertExpose extends NativeAlertExpose {}
