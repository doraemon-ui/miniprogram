import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TimeagoProps, TimeagoExpose } from './types'

export const Timeago = createHostComponent<TimeagoProps, TimeagoExpose>('dora-timeago')

Timeago.displayName = 'DoraTimeago'

// Props registry for Taro WXML template generator
React.createElement('dora-timeago', {
  prefixCls: '',
  to: '',
  from: '',
  refreshable: false,
  lang: '',
})
