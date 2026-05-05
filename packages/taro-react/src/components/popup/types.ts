import type { PopupProps as NativePopupProps, PopupExpose as NativePopupExpose } from '@doraemon-ui/miniprogram.popup'
import type { BasicComponent } from '../../types'

export interface PopupProps extends NativePopupProps, BasicComponent {
  onShow?: (event: any) => void
  onShowed?: (event: any) => void
  onClose?: (event: any) => void
  onClosed?: (event: any) => void
}

export interface PopupExpose extends NativePopupExpose {}
