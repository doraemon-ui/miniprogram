import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { VcodeProps, VcodeExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Vcode = createHostComponent<VcodeProps, VcodeExpose>('dora-vcode',
{
  prefixCls: 'dora-vcode',
  str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  num: 6,
  width: 120,
  height: 40,
  bgColor: '',
  fontColor: '',
  hasPoint: true,
  hasLine: true,
  canvasId: 'dora-vcode',
})

Vcode.displayName = 'DoraVcode'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-vcode', {
  prefixCls: '',
  str: '',
  num: '',
  width: '',
  height: '',
  bgColor: '',
  fontColor: '',
  hasPoint: '',
  hasLine: '',
  canvasId: '',
  onChange: '',
  onError: '',
})
