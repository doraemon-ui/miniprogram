import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { FooterProps, FooterExpose } from './types'

export const Footer = createHostComponent<FooterProps, FooterExpose>('dora-footer')

Footer.displayName = 'DoraFooter'

// Props registry for Taro WXML template generator
React.createElement('dora-footer', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
