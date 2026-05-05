import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { QrcodeProps, QrcodeExpose } from './types'

export const Qrcode = createHostComponent<QrcodeProps, QrcodeExpose>('dora-qrcode')

Qrcode.displayName = 'DoraQrcode'

// Props registry for Taro WXML template generator
React.createElement('dora-qrcode', {
  prefixCls: '',
  typeNumber: 0,
  errorCorrectLevel: 0,
  width: 0,
  height: 0,
  whiteSpace: 0,
  fgColor: '',
  bgColor: '',
  data: '',
  showMenuByLongpress: false,
  qrcodeStatus: '',
  qrcodeExpiredText: '',
  qrcodeRefreshText: '',
  onLoad: undefined,
  onError: undefined,
  onClick: undefined,
  onRefresh: undefined,
})
