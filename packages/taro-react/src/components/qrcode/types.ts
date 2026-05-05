import type { QrcodeProps as NativeQrcodeProps, QrcodeExpose as NativeQrcodeExpose } from '@doraemon-ui/miniprogram.qrcode'
import type { BasicComponent } from '../../types'

export interface QrcodeProps extends NativeQrcodeProps, BasicComponent {
  onLoad?: (event: any) => void
  onError?: (event: any) => void
  onClick?: (event: any) => void
  onRefresh?: (event: any) => void
}

export interface QrcodeExpose extends NativeQrcodeExpose {}
