import { createHostComponent } from '../../hooks/hostComponent'
import type { BarcodeProps, BarcodeExpose } from './types'

export const Barcode = createHostComponent<BarcodeProps, BarcodeExpose>('dora-barcode',
{
  prefixCls: 'dora-barcode',
  width: 200,
  height: 100,
  number: '',
  options: { number: true, prefix: true, color: 'black', debug: false },
  canvasId: 'dora-barcode',
})

Barcode.displayName = 'DoraBarcode'
