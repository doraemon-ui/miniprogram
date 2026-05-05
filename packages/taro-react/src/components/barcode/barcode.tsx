import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { BarcodeProps, BarcodeExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-barcode', {
  prefixCls: '',
  width: '',
  height: '',
  number: '',
  options: '',
  canvasId: '',
})
