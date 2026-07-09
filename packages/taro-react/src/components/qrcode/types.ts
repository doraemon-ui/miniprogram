import type { QrcodeExpose as NativeQrcodeExpose, QrcodeProps as NativeQrcodeProps } from '@doraemon-ui/miniprogram.qrcode'

import type { BasicComponent } from '../../types'

export interface QrcodeProps extends NativeQrcodeProps, BasicComponent {
  onLoad?: (event: any) => void
  onError?: (event: any) => void
  onClick?: (event: any) => void
  onRefresh?: (event: any) => void
}

export interface QrcodeExpose extends NativeQrcodeExpose {}
