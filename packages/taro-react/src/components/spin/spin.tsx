import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SpinProps, SpinExpose } from './types'

export const Spin = createHostComponent<SpinProps, SpinExpose>('dora-spin')

Spin.displayName = 'DoraSpin'

// Props registry for Taro WXML template generator
React.createElement('dora-spin', {
  prefixCls: '',
  classNames: '',
  tip: '',
  size: '',
  spinning: false,
  nested: false,
  spinColor: '',
})
