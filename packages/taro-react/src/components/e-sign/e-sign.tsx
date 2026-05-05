import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ESignProps, ESignExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const ESign = createHostComponent<ESignProps, ESignExpose>('dora-e-sign',
{
  prefixCls: 'dora-e-sign',
  type: 'png',
  width: 'auto',
  height: 200,
  bgColor: '#ffffff',
  lineWidth: 3,
  lineColor: '#000000',
  hasFooter: true,
  cancelText: '重置',
  confirmText: '确定',
})

ESign.displayName = 'DoraESign'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-e-sign', {
  prefixCls: '',
  type: '',
  width: '',
  height: '',
  bgColor: '',
  lineWidth: '',
  lineColor: '',
  hasFooter: '',
  cancelText: '',
  confirmText: '',
  onStart: '',
  onSigning: '',
  onEnd: '',
  onClear: '',
  onSubmit: '',
})
