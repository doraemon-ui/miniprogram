import type { BackdropProps as NativeBackdropProps, BackdropExpose as NativeBackdropExpose } from '@doraemon-ui/miniprogram.backdrop'
import type { BasicComponent } from '../../types'

export interface BackdropProps extends NativeBackdropProps, BasicComponent {
  onShow?: (event: any) => void
  onShowed?: (event: any) => void
  onClose?: (event: any) => void
  onClosed?: (event: any) => void
  onClick?: (event: any) => void
}

export interface BackdropExpose extends NativeBackdropExpose {}
