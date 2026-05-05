import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { RaterProps, RaterExpose } from './types'

export const Rater = createHostComponent<RaterProps, RaterExpose>('dora-rater')

Rater.displayName = 'DoraRater'

// Props registry for Taro WXML template generator
React.createElement('dora-rater', {
  prefixCls: '',
  max: 0,
  icon: '',
  star: '',
  defaultValue: 0,
  value: 0,
  activeColor: '',
  margin: 0,
  fontSize: 0,
  disabled: false,
  allowHalf: false,
  allowClear: false,
  allowTouchMove: false,
  controlled: false,
  onChange: undefined,
})
