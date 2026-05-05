import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ESignProps, ESignExpose } from './types'

export const ESign = createHostComponent<ESignProps, ESignExpose>('dora-e-sign')

ESign.displayName = 'DoraESign'

// Props registry for Taro WXML template generator
React.createElement('dora-e-sign', {
  prefixCls: '',
  type: '',
  width: '',
  height: 0,
  bgColor: '',
  lineWidth: 0,
  lineColor: '',
  hasFooter: false,
  cancelText: '',
  confirmText: '',
  onStart: undefined,
  onSigning: undefined,
  onEnd: undefined,
  onClear: undefined,
  onSubmit: undefined,
})
