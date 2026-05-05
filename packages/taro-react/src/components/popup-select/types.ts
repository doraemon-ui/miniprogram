import type { PopupSelectProps as NativePopupSelectProps, PopupSelectExpose as NativePopupSelectExpose } from '@doraemon-ui/miniprogram.popup-select'
import type { BasicComponent } from '../../types'

export interface PopupSelectProps extends NativePopupSelectProps, BasicComponent {
  onChange?: (event: any) => void
  onClosed?: (event: any) => void
  onCancel?: (event: any) => void
  onValueChange?: (event: any) => void
  onConfirm?: (event: any) => void
}

export interface PopupSelectExpose extends NativePopupSelectExpose {}
