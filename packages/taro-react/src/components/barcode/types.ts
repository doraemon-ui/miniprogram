import type { BarcodeExpose as NativeBarcodeExpose, BarcodeProps as NativeBarcodeProps } from '@doraemon-ui/miniprogram.barcode'

import type { BasicComponent } from '../../types'

export interface BarcodeProps extends NativeBarcodeProps, BasicComponent {
  onValid?: (event: any) => void
  onInvalid?: (event: any) => void
  onLoad?: (event: any) => void
  onSuccess?: (event: any) => void
  onError?: (event: any) => void
}

export interface BarcodeExpose extends NativeBarcodeExpose {}
