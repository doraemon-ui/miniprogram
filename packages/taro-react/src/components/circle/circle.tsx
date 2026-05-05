import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CircleProps, CircleExpose } from './types'

export const Circle = createHostComponent<CircleProps, CircleExpose>('dora-circle')

Circle.displayName = 'DoraCircle'

// Props registry for Taro WXML template generator
React.createElement('dora-circle', {
  prefixCls: '',
  percent: 0,
  strokeWidth: 0,
  size: 0,
  lineCap: '',
  backgroundColor: '',
  color: '',
  sAngle: 0,
  counterclockwise: false,
  speed: 0,
  animate: false,
  background: false,
  onChange: undefined,
})
