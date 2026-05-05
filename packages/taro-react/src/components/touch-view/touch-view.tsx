import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TouchViewProps, TouchViewExpose } from './types'

export const TouchView = createHostComponent<TouchViewProps, TouchViewExpose>('dora-touch-view')

TouchView.displayName = 'DoraTouchView'

// Props registry for Taro WXML template generator
React.createElement('dora-touch-view', {
  prefixCls: '',
  hoverClass: '',
  hoverStopPropagation: false,
  hoverStartTime: 0,
  hoverStayTime: 0,
  wrapStyle: null,
  onClick: undefined,
})
