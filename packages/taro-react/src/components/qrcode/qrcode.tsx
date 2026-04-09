import { createHostComponent } from '@/hooks/hostComponent'
import type { QrcodeProps, QrcodeExpose } from './types'

export const Qrcode = createHostComponent<QrcodeProps, QrcodeExpose>('dora-qrcode')

Qrcode.displayName = 'DoraQrcode'
