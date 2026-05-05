import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { QrcodeProps, QrcodeExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Qrcode = createHostComponent<QrcodeProps, QrcodeExpose>('dora-qrcode',
{
  prefixCls: 'dora-qrcode',
  typeNumber: -1,
  errorCorrectLevel: 2,
  width: 200,
  height: 200,
  whiteSpace: 0,
  fgColor: 'black',
  bgColor: 'white',
  data: '',
  showMenuByLongpress: false,
  qrcodeStatus: 'activated',
  qrcodeExpiredText: '二维码过期',
  qrcodeRefreshText: '点击刷新',
})

Qrcode.displayName = 'DoraQrcode'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-qrcode', {
  prefixCls: '',
  typeNumber: '',
  errorCorrectLevel: '',
  width: '',
  height: '',
  whiteSpace: '',
  fgColor: '',
  bgColor: '',
  data: '',
  showMenuByLongpress: '',
  qrcodeStatus: '',
  qrcodeExpiredText: '',
  qrcodeRefreshText: '',
  onLoad: '',
  onError: '',
  onClick: '',
  onRefresh: '',
})
