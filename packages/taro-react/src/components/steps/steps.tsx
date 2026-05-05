import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { StepsProps, StepsExpose } from './types'

export const Steps = createHostComponent<StepsProps, StepsExpose>('dora-steps')

Steps.displayName = 'DoraSteps'

// Props registry for Taro WXML template generator
React.createElement('dora-steps', {
  prefixCls: '',
  current: 0,
  direction: '',
})
