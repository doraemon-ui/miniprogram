import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { StickyProps, StickyExpose } from './types'

export const Sticky = createHostComponent<StickyProps, StickyExpose>('dora-sticky')

Sticky.displayName = 'DoraSticky'

// Props registry for Taro WXML template generator
React.createElement('dora-sticky', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
