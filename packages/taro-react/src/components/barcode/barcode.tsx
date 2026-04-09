import { createHostComponent } from '@/hooks/hostComponent'
import type { BarcodeProps, BarcodeExpose } from './types'

export const Barcode = createHostComponent<BarcodeProps, BarcodeExpose>('dora-barcode')

Barcode.displayName = 'DoraBarcode'
