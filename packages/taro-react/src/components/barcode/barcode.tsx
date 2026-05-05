import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { BarcodeProps, BarcodeExpose } from './types'

export const Barcode = createHostComponent<BarcodeProps, BarcodeExpose>('dora-barcode')

Barcode.displayName = 'DoraBarcode'

// Props registry for Taro WXML template generator
React.createElement('dora-barcode', {
  prefixCls: '',
  width: 0,
  height: 0,
  number: '',
  options: '',
  canvasId: '',
})
