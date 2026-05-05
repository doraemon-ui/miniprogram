import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { FloatingPanelProps, FloatingPanelExpose } from './types'

export const FloatingPanel = createHostComponent<FloatingPanelProps, FloatingPanelExpose>('dora-floating-panel')

FloatingPanel.displayName = 'DoraFloatingPanel'

// Props registry for Taro WXML template generator
React.createElement('dora-floating-panel', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
