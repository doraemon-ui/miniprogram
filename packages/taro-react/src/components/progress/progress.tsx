import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ProgressProps, ProgressExpose } from './types'

export const Progress = createHostComponent<ProgressProps, ProgressExpose>('dora-progress')

Progress.displayName = 'DoraProgress'

// Props registry for Taro WXML template generator
React.createElement('dora-progress', {
  prefixCls: '',
  percent: 0,
  strokeWidth: 0,
  activeColor: '',
  backgroundColor: '',
  status: '',
  shape: '',
  barStyle: null,
  showInfo: false,
})
