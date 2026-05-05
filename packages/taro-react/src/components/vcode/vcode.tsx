import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { VcodeProps, VcodeExpose } from './types'

export const Vcode = createHostComponent<VcodeProps, VcodeExpose>('dora-vcode')

Vcode.displayName = 'DoraVcode'

// Props registry for Taro WXML template generator
React.createElement('dora-vcode', {
  prefixCls: '',
  str: '',
  num: 0,
  width: 0,
  height: 0,
  bgColor: '',
  fontColor: '',
  hasPoint: false,
  hasLine: false,
  canvasId: '',
  onChange: undefined,
  onError: undefined,
})
