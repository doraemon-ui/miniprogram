import type { QrcodeProps as NativeQrcodeProps, QrcodeExpose as NativeQrcodeExpose } from '@doraemon-ui/miniprogram.qrcode'
import type { BasicComponent } from '@/types'

export interface QrcodeProps extends NativeQrcodeProps, BasicComponent {}

export interface QrcodeExpose extends NativeQrcodeExpose {}
